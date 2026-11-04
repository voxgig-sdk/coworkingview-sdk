-- Coworkingview SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Coworkingview",
      slug = "coworkingview",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.coworkingview.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["config"] = {},
        ["facet"] = {},
        ["geo"] = {},
        ["health"] = {},
        ["market"] = {},
        ["operator"] = {},
        ["place"] = {},
        ["property"] = {},
        ["search"] = {},
      },
    },
    entity = {
      ["config"] = {
        ["fields"] = {
          {
            ["name"] = "flags",
            ["title"] = "Flags",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "message",
            ["title"] = "Message",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "minSupportedBuild",
            ["title"] = "Min Supported Build",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
          },
          {
            ["name"] = "recommendedBuild",
            ["title"] = "Recommended Build",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "config",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/config",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "config",
                  },
                },
                ["parts"] = {
                  "v1",
                  "config",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["facet"] = {
        ["fields"] = {
          {
            ["name"] = "capacityRange",
            ["title"] = "Capacity Range",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "facets",
            ["title"] = "Facets",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "priceRange",
            ["title"] = "Price Range",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
        },
        ["name"] = "facet",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/facets",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "facets",
                  },
                },
                ["parts"] = {
                  "v1",
                  "facets",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "berlin",
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                    {
                      ["name"] = "operator",
                      ["orig"] = "operator",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "pricing_option_type",
                      ["orig"] = "pricingOptionType",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "zone",
                      ["orig"] = "zone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["geo"] = {
        ["fields"] = {},
        ["name"] = "geo",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/geo/bootstrap",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "geo",
                  },
                  {
                    ["lit"] = "bootstrap",
                  },
                },
                ["parts"] = {
                  "v1",
                  "geo",
                  "bootstrap",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "bootstrap",
                  ["exist"] = {
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["health"] = {
        ["fields"] = {
          {
            ["name"] = "sha",
            ["title"] = "Sha",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
        },
        ["name"] = "health",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/health",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "health",
                  },
                },
                ["parts"] = {
                  "v1",
                  "health",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["market"] = {
        ["fields"] = {},
        ["name"] = "market",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/market/rates",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "market",
                  },
                  {
                    ["lit"] = "rates",
                  },
                },
                ["parts"] = {
                  "v1",
                  "market",
                  "rates",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "berlin",
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "rate",
                  ["exist"] = {
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["operator"] = {
        ["fields"] = {
          {
            ["name"] = "asOf",
            ["title"] = "As Of",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "date-time",
          },
          {
            ["name"] = "cities",
            ["title"] = "Cities",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "faqs",
            ["title"] = "Faqs",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "indexabilityBrand",
            ["title"] = "Indexability Brand",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "logo",
            ["title"] = "Logo",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "pricePosition",
            ["title"] = "Price Position",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "propertyCount",
            ["title"] = "Property Count",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "tagline",
            ["title"] = "Tagline",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "slug",
          ["name"] = "id",
        },
        ["name"] = "operator",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/operators/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "operators",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "operators",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "hq",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
                ["alias"] = {
                  ["id"] = "slug",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["place"] = {
        ["fields"] = {
          {
            ["name"] = "asOf",
            ["title"] = "As Of",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "date-time",
          },
          {
            ["name"] = "center",
            ["title"] = "Center",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "faqs",
            ["title"] = "Faqs",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "intro",
            ["title"] = "Intro",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "parent",
            ["title"] = "Parent",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "priceRange",
            ["title"] = "Price Range",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "propertyCount",
            ["title"] = "Property Count",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
          },
          {
            ["name"] = "shortDescription",
            ["title"] = "Short Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["kind"] = "kind",
            ["slug"] = "slug",
          },
          ["name"] = "id",
          ["parts"] = {
            "kind",
            "slug",
          },
          ["sep"] = "/",
        },
        ["name"] = "place",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/places/{kind}/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "places",
                  },
                  {
                    ["var"] = "kind",
                  },
                  {
                    ["var"] = "slug",
                  },
                },
                ["parts"] = {
                  "v1",
                  "places",
                  "{kind}",
                  "{slug}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "kind",
                      ["orig"] = "kind",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "zone",
                    },
                    {
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "mitte",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "kind",
                    "locale",
                    "slug",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["property"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["title"] = "Address",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "amenities",
            ["title"] = "Amenities",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "capacity",
            ["title"] = "Capacity",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "capacity_status",
            ["title"] = "Capacity Status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "city",
            ["title"] = "City",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "coordinates",
            ["title"] = "Coordinates",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "countryCode",
            ["title"] = "Country Code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "distanceMeters",
            ["title"] = "Distance Meters",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "excerpt",
            ["title"] = "Excerpt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "featured",
            ["title"] = "Featured",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
          },
          {
            ["name"] = "fromBillingPeriod",
            ["title"] = "From Billing Period",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fromPrice",
            ["title"] = "From Price",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "images",
            ["title"] = "Images",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "indexabilityCompleteness",
            ["title"] = "Indexability Completeness",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "indexabilityState",
            ["title"] = "Indexability State",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "marketPosition",
            ["title"] = "Market Position",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "operator",
            ["title"] = "Operator",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "pricingOptions",
            ["title"] = "Pricing Options",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "updatedAt",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "When the underlying CMS record was last updated.",
            ["format"] = "date-time",
          },
          {
            ["name"] = "webUrl",
            ["title"] = "Web Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "uri",
          },
          {
            ["name"] = "zone",
            ["title"] = "Zone",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
        },
        ["id"] = {
          ["field"] = "slug",
          ["name"] = "id",
        },
        ["name"] = "property",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/properties",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "properties",
                  },
                },
                ["parts"] = {
                  "v1",
                  "properties",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "address",
                      ["orig"] = "address",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "amenity",
                      ["orig"] = "amenities",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "berlin",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                    {
                      ["name"] = "max_price",
                      ["orig"] = "maxPrice",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "min_capacity",
                      ["orig"] = "minCapacity",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 4,
                    },
                    {
                      ["name"] = "min_price",
                      ["orig"] = "minPrice",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "operator",
                      ["orig"] = "operator",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "pageSize",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2,
                    },
                    {
                      ["name"] = "pricing_option_type",
                      ["orig"] = "pricingOptionType",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "private_office",
                    },
                    {
                      ["name"] = "radius_meter",
                      ["orig"] = "radiusMeters",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "seed",
                      ["orig"] = "seed",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "sort_by",
                      ["orig"] = "sortBy",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "zone",
                      ["orig"] = "zone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
                ["alias"] = {
                  ["id"] = "slug",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/properties/map",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "properties",
                  },
                  {
                    ["lit"] = "map",
                  },
                },
                ["parts"] = {
                  "v1",
                  "properties",
                  "map",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "address",
                      ["orig"] = "address",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "amenity",
                      ["orig"] = "amenities",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "13.2,52.4,13.6,52.6",
                    },
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "currency",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                    {
                      ["name"] = "max_price",
                      ["orig"] = "maxPrice",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "min_capacity",
                      ["orig"] = "minCapacity",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "min_price",
                      ["orig"] = "minPrice",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "operator",
                      ["orig"] = "operator",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "pageSize",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "pricing_option_type",
                      ["orig"] = "pricingOptionType",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "radius_meter",
                      ["orig"] = "radiusMeters",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "seed",
                      ["orig"] = "seed",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "sort_by",
                      ["orig"] = "sortBy",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "zone",
                      ["orig"] = "zone",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "map",
                  ["exist"] = {
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
                ["alias"] = {
                  ["id"] = "slug",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/properties/{slug}",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "properties",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v1",
                  "properties",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["slug"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "hq-kings-cross-london",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "locale",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
                ["alias"] = {
                  ["id"] = "slug",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {},
        ["name"] = "search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/search/suggest",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "suggest",
                  },
                },
                ["parts"] = {
                  "v1",
                  "search",
                  "suggest",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 5,
                    },
                    {
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "en",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "mitte",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "suggest",
                  ["exist"] = {
                    "locale",
                    "q",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
