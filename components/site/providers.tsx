"use client";
import {SiteExtras} from "./extras";
import {ThemeProvider} from "next-themes";
import {MotionConfig} from "framer-motion";
import {AdminProvider} from "@/components/admin/admin-provider";
import {ContentProvider,type ContentState} from "@/components/admin/content-provider";

export function Providers({children,initialContent}:{children:React.ReactNode;initialContent?:Partial<ContentState>}){
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <AdminProvider>
          <ContentProvider initialContent={initialContent}>
            {children}
            <SiteExtras/>
          </ContentProvider>
        </AdminProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
