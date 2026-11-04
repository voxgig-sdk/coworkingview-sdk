# Coworkingview SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Coworkingview",
            "slug": "coworkingview",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.coworkingview.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "config": {},
                "facet": {},
                "geo": {},
                "health": {},
                "market": {},
                "operator": {},
                "place": {},
                "property": {},
                "search": {},
            },
        },
        "entity": {
      "config": {
        "fields": [
          {
            "name": "flags",
            "title": "Flags",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "minSupportedBuild",
            "title": "Min Supported Build",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "recommendedBuild",
            "title": "Recommended Build",
            "type": "`$INTEGER`",
          },
        ],
        "name": "config",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/config",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "config",
                  },
                ],
                "parts": [
                  "v1",
                  "config",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "facet": {
        "fields": [
          {
            "name": "capacityRange",
            "title": "Capacity Range",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "facets",
            "title": "Facets",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "priceRange",
            "title": "Price Range",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "facet",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/facets",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "facets",
                  },
                ],
                "parts": [
                  "v1",
                  "facets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "berlin",
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                    {
                      "name": "operator",
                      "orig": "operator",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "pricing_option_type",
                      "orig": "pricingOptionType",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "zone",
                      "orig": "zone",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "geo": {
        "fields": [],
        "name": "geo",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/geo/bootstrap",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "geo",
                  },
                  {
                    "lit": "bootstrap",
                  },
                ],
                "parts": [
                  "v1",
                  "geo",
                  "bootstrap",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "$action": "bootstrap",
                  "exist": [
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "health": {
        "fields": [
          {
            "name": "sha",
            "title": "Sha",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "health",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/health",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "health",
                  },
                ],
                "parts": [
                  "v1",
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "market": {
        "fields": [],
        "name": "market",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/market/rates",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "market",
                  },
                  {
                    "lit": "rates",
                  },
                ],
                "parts": [
                  "v1",
                  "market",
                  "rates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "berlin",
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "$action": "rate",
                  "exist": [
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "operator": {
        "fields": [
          {
            "name": "asOf",
            "title": "As Of",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "cities",
            "title": "Cities",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "faqs",
            "title": "Faqs",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "indexabilityBrand",
            "title": "Indexability Brand",
            "type": "`$ANY`",
          },
          {
            "name": "logo",
            "title": "Logo",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "pricePosition",
            "title": "Price Position",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "propertyCount",
            "title": "Property Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tagline",
            "title": "Tagline",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "slug",
          "name": "id",
        },
        "name": "operator",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/operators/{slug}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "operators",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "operators",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hq",
                    },
                  ],
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
                "alias": {
                  "id": "slug",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "place": {
        "fields": [
          {
            "name": "asOf",
            "title": "As Of",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "center",
            "title": "Center",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "faqs",
            "title": "Faqs",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "intro",
            "title": "Intro",
            "type": "`$STRING`",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "parent",
            "title": "Parent",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "priceRange",
            "title": "Price Range",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "propertyCount",
            "title": "Property Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "shortDescription",
            "title": "Short Description",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "kind": "kind",
            "slug": "slug",
          },
          "name": "id",
          "parts": [
            "kind",
            "slug",
          ],
          "sep": "/",
        },
        "name": "place",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/{kind}/{slug}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "places",
                  },
                  {
                    "var": "kind",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "v1",
                  "places",
                  "{kind}",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "kind",
                      "orig": "kind",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "zone",
                    },
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "mitte",
                    },
                  ],
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "kind",
                    "locale",
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "property": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "amenities",
            "title": "Amenities",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "capacity",
            "title": "Capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "capacity_status",
            "title": "Capacity Status",
            "type": "`$STRING`",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "coordinates",
            "title": "Coordinates",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "countryCode",
            "title": "Country Code",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "distanceMeters",
            "title": "Distance Meters",
            "type": "`$NUMBER`",
          },
          {
            "name": "excerpt",
            "title": "Excerpt",
            "type": "`$STRING`",
          },
          {
            "name": "featured",
            "title": "Featured",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "fromBillingPeriod",
            "title": "From Billing Period",
            "type": "`$STRING`",
          },
          {
            "name": "fromPrice",
            "title": "From Price",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "images",
            "title": "Images",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "indexabilityCompleteness",
            "title": "Indexability Completeness",
            "type": "`$ANY`",
          },
          {
            "name": "indexabilityState",
            "title": "Indexability State",
            "type": "`$ANY`",
          },
          {
            "name": "marketPosition",
            "title": "Market Position",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "operator",
            "title": "Operator",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "pricingOptions",
            "title": "Pricing Options",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "When the underlying CMS record was last updated.",
            "format": "date-time",
          },
          {
            "name": "webUrl",
            "title": "Web Url",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
          {
            "name": "zone",
            "title": "Zone",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "slug",
          "name": "id",
        },
        "name": "property",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/properties",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "properties",
                  },
                ],
                "parts": [
                  "v1",
                  "properties",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "address",
                      "orig": "address",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "amenity",
                      "orig": "amenities",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "bbox",
                      "orig": "bbox",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "berlin",
                      "field": True,
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "lng",
                      "orig": "lng",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                    {
                      "name": "max_price",
                      "orig": "maxPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "min_capacity",
                      "orig": "minCapacity",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 4,
                    },
                    {
                      "name": "min_price",
                      "orig": "minPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "operator",
                      "orig": "operator",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "page_size",
                      "orig": "pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2,
                    },
                    {
                      "name": "pricing_option_type",
                      "orig": "pricingOptionType",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "private_office",
                    },
                    {
                      "name": "radius_meter",
                      "orig": "radiusMeters",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "seed",
                      "orig": "seed",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sortBy",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "zone",
                      "orig": "zone",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
                "alias": {
                  "id": "slug",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/properties/map",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "properties",
                  },
                  {
                    "lit": "map",
                  },
                ],
                "parts": [
                  "v1",
                  "properties",
                  "map",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "address",
                      "orig": "address",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "amenity",
                      "orig": "amenities",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "bbox",
                      "orig": "bbox",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "13.2,52.4,13.6,52.6",
                    },
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "lng",
                      "orig": "lng",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                    {
                      "name": "max_price",
                      "orig": "maxPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "min_capacity",
                      "orig": "minCapacity",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "min_price",
                      "orig": "minPrice",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "operator",
                      "orig": "operator",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "page_size",
                      "orig": "pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "pricing_option_type",
                      "orig": "pricingOptionType",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "radius_meter",
                      "orig": "radiusMeters",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "seed",
                      "orig": "seed",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sortBy",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "zone",
                      "orig": "zone",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "$action": "map",
                  "exist": [
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
                "alias": {
                  "id": "slug",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/properties/{slug}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "properties",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "properties",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hq-kings-cross-london",
                    },
                  ],
                  "query": [
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "locale",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
                "alias": {
                  "id": "slug",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/search/suggest",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "suggest",
                  },
                ],
                "parts": [
                  "v1",
                  "search",
                  "suggest",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5,
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "en",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "mitte",
                    },
                  ],
                },
                "select": {
                  "$action": "suggest",
                  "exist": [
                    "locale",
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
