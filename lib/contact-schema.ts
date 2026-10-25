import {z} from "zod";
export const projectTypes=["iOS app","Android app","App UI/UX design","App maintenance"] as const;
export const budgets=["Under $5,000","$5,000–$15,000","$15,000–$30,000","$30,000–$60,000","$60,000+","Let’s discuss"] as const;
export const contactSchema=z.object({name:z.string().trim().min(2,"Please enter your name.").max(100),email:z.string().trim().email("Enter a valid email address.").max(254),company:z.string().trim().max(150).optional(),budget:z.enum(budgets,{errorMap:()=>({message:"Select a budget range."})}),projectTypes:z.array(z.enum(projectTypes)).min(1,"Choose at least one project type.").max(4),message:z.string().trim().min(20,"Tell us a little more (at least 20 characters).").max(5000,"Keep your message under 5,000 characters."),website:z.string().max(300).optional()});
export type ContactInput=z.infer<typeof contactSchema>;
