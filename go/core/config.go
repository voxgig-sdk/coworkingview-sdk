package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Coworkingview",
			"slug": "coworkingview",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.coworkingview.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"config": map[string]any{},
				"facet": map[string]any{},
				"geo": map[string]any{},
				"health": map[string]any{},
				"market": map[string]any{},
				"operator": map[string]any{},
				"place": map[string]any{},
				"property": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"config": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "flags",
						"title": "Flags",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "minSupportedBuild",
						"title": "Min Supported Build",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "recommendedBuild",
						"title": "Recommended Build",
						"type": "`$INTEGER`",
					},
				},
				"name": "config",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/config",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "config",
									},
								},
								"parts": []any{
									"v1",
									"config",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"facet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capacityRange",
						"title": "Capacity Range",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "facets",
						"title": "Facets",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "priceRange",
						"title": "Price Range",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "facet",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/facets",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "facets",
									},
								},
								"parts": []any{
									"v1",
									"facets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"example": "berlin",
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
										map[string]any{
											"name": "operator",
											"orig": "operator",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pricing_option_type",
											"orig": "pricingOptionType",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "zone",
											"orig": "zone",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"geo": map[string]any{
				"fields": []any{},
				"name": "geo",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/geo/bootstrap",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "geo",
									},
									map[string]any{
										"lit": "bootstrap",
									},
								},
								"parts": []any{
									"v1",
									"geo",
									"bootstrap",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"$action": "bootstrap",
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"health": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "sha",
						"title": "Sha",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "health",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/health",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"v1",
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{},
				"name": "market",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/market/rates",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "market",
									},
									map[string]any{
										"lit": "rates",
									},
								},
								"parts": []any{
									"v1",
									"market",
									"rates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"example": "berlin",
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"$action": "rate",
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"operator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asOf",
						"title": "As Of",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "cities",
						"title": "Cities",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "faqs",
						"title": "Faqs",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "indexabilityBrand",
						"title": "Indexability Brand",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "pricePosition",
						"title": "Price Position",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "propertyCount",
						"title": "Property Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tagline",
						"title": "Tagline",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "slug",
					"name": "id",
				},
				"name": "operator",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/operators/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "operators",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"operators",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "hq",
										},
									},
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
								"alias": map[string]any{
									"id": "slug",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asOf",
						"title": "As Of",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "center",
						"title": "Center",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "faqs",
						"title": "Faqs",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intro",
						"title": "Intro",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "priceRange",
						"title": "Price Range",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "propertyCount",
						"title": "Property Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "shortDescription",
						"title": "Short Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"kind": "kind",
						"slug": "slug",
					},
					"name": "id",
					"parts": []any{
						"kind",
						"slug",
					},
					"sep": "/",
				},
				"name": "place",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/{kind}/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"var": "kind",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"v1",
									"places",
									"{kind}",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "kind",
											"orig": "kind",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "zone",
										},
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "mitte",
										},
									},
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"kind",
										"locale",
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"property": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "amenities",
						"title": "Amenities",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "capacity",
						"title": "Capacity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "capacity_status",
						"title": "Capacity Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "coordinates",
						"title": "Coordinates",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "distanceMeters",
						"title": "Distance Meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "excerpt",
						"title": "Excerpt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "featured",
						"title": "Featured",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "fromBillingPeriod",
						"title": "From Billing Period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fromPrice",
						"title": "From Price",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "indexabilityCompleteness",
						"title": "Indexability Completeness",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "indexabilityState",
						"title": "Indexability State",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "marketPosition",
						"title": "Market Position",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "operator",
						"title": "Operator",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "pricingOptions",
						"title": "Pricing Options",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "When the underlying CMS record was last updated.",
						"format": "date-time",
					},
					map[string]any{
						"name": "webUrl",
						"title": "Web Url",
						"type": "`$STRING`",
						"req": true,
						"format": "uri",
					},
					map[string]any{
						"name": "zone",
						"title": "Zone",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "slug",
					"name": "id",
				},
				"name": "property",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/properties",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "properties",
									},
								},
								"parts": []any{
									"v1",
									"properties",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "address",
											"orig": "address",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "amenity",
											"orig": "amenities",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"example": "berlin",
											"field": true,
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lng",
											"orig": "lng",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
										map[string]any{
											"name": "max_price",
											"orig": "maxPrice",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "min_capacity",
											"orig": "minCapacity",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 4,
										},
										map[string]any{
											"name": "min_price",
											"orig": "minPrice",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "operator",
											"orig": "operator",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2,
										},
										map[string]any{
											"name": "pricing_option_type",
											"orig": "pricingOptionType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "private_office",
										},
										map[string]any{
											"name": "radius_meter",
											"orig": "radiusMeters",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "seed",
											"orig": "seed",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sortBy",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "zone",
											"orig": "zone",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
								"alias": map[string]any{
									"id": "slug",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/properties/map",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "properties",
									},
									map[string]any{
										"lit": "map",
									},
								},
								"parts": []any{
									"v1",
									"properties",
									"map",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "address",
											"orig": "address",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "amenity",
											"orig": "amenities",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
											"kind": "query",
											"example": "13.2,52.4,13.6,52.6",
										},
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lng",
											"orig": "lng",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
										map[string]any{
											"name": "max_price",
											"orig": "maxPrice",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "min_capacity",
											"orig": "minCapacity",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "min_price",
											"orig": "minPrice",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "operator",
											"orig": "operator",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "pricing_option_type",
											"orig": "pricingOptionType",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "radius_meter",
											"orig": "radiusMeters",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "seed",
											"orig": "seed",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sortBy",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "zone",
											"orig": "zone",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "map",
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
								"alias": map[string]any{
									"id": "slug",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/properties/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "properties",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v1",
									"properties",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "hq-kings-cross-london",
										},
									},
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
								"alias": map[string]any{
									"id": "slug",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/search/suggest",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "suggest",
									},
								},
								"parts": []any{
									"v1",
									"search",
									"suggest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "en",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "mitte",
										},
									},
								},
								"select": map[string]any{
									"$action": "suggest",
									"exist": []any{
										"locale",
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
