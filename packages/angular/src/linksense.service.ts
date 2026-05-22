import { Injectable } from "@angular/core";
import { detect, normalizeUrl, extractFromUrl } from "@linksense/core";
import type { DetectResult, NormalizedUrl, ExtractedData } from "@linksense/core";

@Injectable({
  providedIn: "root",
})
export class LinkSenseService {
  detect(url: string): DetectResult | null {
    return detect(url);
  }

  normalize(url: string): NormalizedUrl | null {
    return normalizeUrl(url);
  }

  extract(url: string): ExtractedData | null {
    return extractFromUrl(url);
  }
}
