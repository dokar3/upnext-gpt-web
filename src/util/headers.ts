import { IncomingMessage } from "http";

export namespace HeaderUtil {
  export function getIpAddress(req: Request): string | null {
    return resolveIpFromHeader((key) => req.headers.get(key));
  }

  export function getIpAddressNextRequest(
    req: IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    }
  ): string | null {
    return resolveIpFromHeader((key) => req.headers[key]);
  }

  function resolveIpFromHeader(
    getHeaderValue: (key: string) => string | string[] | undefined | null
  ): string | null {
    const ipFromHeaderValue = (
      value: string | string[] | undefined | null
    ): string | null => {
      if (Array.isArray(value)) {
        return value[0] ?? null;
      } else if (typeof value === "string") {
        return value.split(",")[0];
      } else {
        return null;
      }
    };

    // Cloudflare
    const cfIp = ipFromHeaderValue(getHeaderValue("cf-connecting-ip"));
    if (cfIp != null) {
      return cfIp;
    }

    const xRealIp = ipFromHeaderValue(getHeaderValue("x-real-ip"));
    if (xRealIp != null) {
      return xRealIp;
    }

    const xForwardFor = ipFromHeaderValue(getHeaderValue("x-forwarded-for"));
    if (xForwardFor != null) {
      return xForwardFor;
    }

    return null;
  }
}
