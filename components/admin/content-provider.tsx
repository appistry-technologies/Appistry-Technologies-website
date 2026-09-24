"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc, onSnapshot, writeBatch } from "firebase/firestore";
import {extrasDefaults, validateContent} from "@/lib/cms";
import {useAdmin} from "./admin-provider";
import { db } from "@/lib/firebase";

// Import all static content as defaults
import { copy as defaultCopy } from "@/content/copy";
import { apps as defaultApps } from "@/content/apps";
import { services as defaultServices } from "@/content/services";
import { site as defaultSite } from "@/content/site";
import { technologies as defaultTech, processSteps as defaultProcess } from "@/content/technology";
import { testimonials as defaultTestimonials } from "@/content/testimonials";
import { work as defaultWork } from "@/content/work";

export interface ContentState {
  extras: typeof extrasDefaults;
  copy: typeof defaultCopy;
  apps: typeof defaultApps;
  services: typeof defaultServices;
  site: typeof defaultSite;
  technology: { technologies: typeof defaultTech; processSteps: typeof defaultProcess };
  testimonials: typeof defaultTestimonials;
  work: typeof defaultWork;
}

export const defaultContent: ContentState = {
  extras: extrasDefaults,
  copy: defaultCopy,
  apps: defaultApps,
  services: defaultServices,
  site: defaultSite,
  technology: { technologies: defaultTech, processSteps: defaultProcess },
  testimonials: defaultTestimonials,
  work: defaultWork,
};

interface ContentContextType {
  content: ContentState;
  updateContent: (collection: keyof ContentState, path: string | null, newValue: unknown, reportErrors?: boolean) => Promise<void>;
  isLoading: boolean;
  canEdit: (collection:keyof ContentState)=>boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateContent: async () => {},
  isLoading: true,
  canEdit:()=>false,
});

function mergeDefaults(base:unknown, saved:unknown):unknown {
  if(Array.isArray(saved))return saved;
  if(base && saved && typeof base === "object" && typeof saved === "object" && !Array.isArray(base))return Object.fromEntries(Object.entries({...base,...saved}).map(([key,value])=>[key,mergeDefaults((base as Record<string,unknown>)[key],value)]));
  return saved ?? base;
}

export function ContentProvider({ children,initialContent }: { children: React.ReactNode; initialContent?:Partial<ContentState> }) {
  const {isAdmin}=useAdmin();
  const [content, setContent] = useState<ContentState>(()=>mergeDefaults(defaultContent,initialContent||{}) as ContentState);
  const [loaded,setLoaded]=useState<Record<string,boolean>>({});
  const sourceKey=(collection:keyof ContentState)=>collection === "extras" ? `extras:${isAdmin}` : collection;
  const canEdit=(collection:keyof ContentState)=>!!loaded[sourceKey(collection)];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collections: (keyof ContentState)[] = [
      "copy", "apps", "services", "site", "technology", "testimonials", "work", "extras"
    ];
    const pending = new Set(collections);
    const settled = (collection: keyof ContentState) => {
      pending.delete(collection);
      if (pending.size === 0) setIsLoading(false);
    };
    // Visitors read content only. Missing or unavailable documents use local defaults.
    const unsubscribes = collections.map(collection => onSnapshot(
      doc(db, "siteContent", collection === "extras" && !isAdmin ? "extrasPublic" : collection),
      snapshot => {
        if (snapshot.exists() && snapshot.data().data != null) {
          setContent(previous => ({ ...previous, [collection]: mergeDefaults(defaultContent[collection], snapshot.data().data) }));
        }
        setLoaded(previous=>({...previous,[collection === "extras" ? `extras:${isAdmin}` : collection]:true}));
        settled(collection);
      },
      () => settled(collection)
    ));
    // An offline connection must not block access to the bundled content indefinitely.
    const timeout = setTimeout(() => setIsLoading(false), 8000);
    return () => {
      clearTimeout(timeout);
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [isAdmin]);

  const updateContent = async (collection: keyof ContentState, path: string | null, newValue: unknown, reportErrors = false) => {
    try {
      if(!canEdit(collection))throw new Error("Content is still loading or could not be read. Check your connection and Firebase permissions, then reload before editing.");
      const docRef = doc(db, "siteContent", collection);
      let next = newValue;
      if (path) {
        const saved = await getDoc(docRef);
        const base = structuredClone(mergeDefaults(defaultContent[collection],saved.data()?.data ?? content[collection])) as Record<string, unknown>;
        const parts = path.split(".");
        let target = base;
        for (const part of parts.slice(0, -1)) {
          target[part] = {...(target[part] as Record<string, unknown> ?? {})};
          target = target[part] as Record<string, unknown>;
        }
        target[parts[parts.length-1]] = newValue;
        next = base;
      }
      validateContent(collection, next);
      if(collection === "extras") {
        const extra=next as ContentState["extras"];
        const batch=writeBatch(db);
        batch.set(docRef,{data:extra});
        batch.set(doc(db,"siteContent","extrasPublic"),{data:{...extra,blog:extra.blog.filter(post=>post.published)}});
        await batch.commit();
      } else await setDoc(docRef, { data: next });
      setContent(previous => ({...previous, [collection]: next}));
    } catch (error) {
      if (reportErrors) throw error;
      console.error("Content save failed", error);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isLoading, canEdit }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
