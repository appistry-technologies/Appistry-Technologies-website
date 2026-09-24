import { EditableText } from "@/components/admin/editable";

import {copy} from "@/content/copy";
export default function NotFound(){return <section className="container page-intro"><div className="eyebrow"><EditableText path="app_not_found.text1" fallback={copy.app_not_found.text1} /></div><h1><EditableText path="app_not_found.text2" fallback={copy.app_not_found.text2} /><br/><EditableText path="app_not_found.text3" fallback={copy.app_not_found.text3} /></h1><p><EditableText path="app_not_found.text4" fallback={copy.app_not_found.text4} /></p><a href="/" className="cta"><EditableText path="app_not_found.text5" fallback={copy.app_not_found.text5} /></a></section>}
