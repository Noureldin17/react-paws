export const endpointMap: Record<string, Record<string, boolean>> = {
    GET: {
      "pet-types": false,
      "categories": false,
      "products": false,
      "products/filter": false,
      "adoption": false,
      "adoption-request": true,
    },
    POST: {
      "signup": false,
      "signin": false,
      "pet-types": true, // Admin-only functionality still requires authentication
      "categories": true,
      "products": true,
      "adoption": true,
      "adoption-request": true,
    },
    DELETE: {
      "pet-types": true,
      "categories": true,
      "products": true,
    },
  };
  