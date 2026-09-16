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
			"name": "MunicipalFinance",
			"slug": "municipal-finance",
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
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://municipaldata.treasury.gov.za/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"aged_creditor": map[string]any{},
				"aged_debtor": map[string]any{},
				"fact": map[string]any{},
			},
		},
		"entity": map[string]any{
			"aged_creditor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount_sum",
						"short": "Sum of the amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "amount_type_code",
						"short": "Amount type code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "amount_type_label",
						"short": "Amount type label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_code",
						"short": "Municipality demarcation code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_label",
						"short": "Municipality name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "financial_period_period",
						"short": "Financial period number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"short": "Financial year end",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_code",
						"short": "Item code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_composition",
						"short": "Item composition formula",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_label",
						"short": "Item label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"short": "Position in return form",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"short": "Return form structure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period_length_length",
						"short": "Period length",
						"type": "`$STRING`",
					},
				},
				"name": "aged_creditor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "amount.sum",
											"kind": "query",
											"name": "aggregate",
											"orig": "aggregate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "financial_year_end.year:2020|demarcation.code:CPT",
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "item.code|financial_period.period",
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "financial_period.period:asc",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10000,
											"kind": "query",
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/aged_creditor/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "aged_creditor",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"$action": "fact",
									"exist": []any{
										"aggregate",
										"cut",
										"drilldown",
										"order",
										"page",
										"pagesize",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"aged_creditor",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "aggregate",
											"orig": "aggregate",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10000,
											"kind": "query",
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/aged_creditor_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "aged_creditor_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"aggregate",
										"cut",
										"drilldown",
										"order",
										"page",
										"pagesize",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"aged_creditor_v2",
									"facts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"aged_debtor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount_sum",
						"short": "Sum of the amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "amount_type_code",
						"short": "Amount type code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "amount_type_label",
						"short": "Amount type label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customer_group_code",
						"short": "Customer group code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_code",
						"short": "Municipality demarcation code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_label",
						"short": "Municipality name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "financial_period_period",
						"short": "Financial period number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"short": "Financial year end",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_code",
						"short": "Item code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_composition",
						"short": "Item composition formula",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_label",
						"short": "Item label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"short": "Position in return form",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"short": "Return form structure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period_length_length",
						"short": "Period length",
						"type": "`$STRING`",
					},
				},
				"name": "aged_debtor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "aggregate",
											"orig": "aggregate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "financial_year_end.year:2020|customer_group.code:households",
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "item.code|customer_group.code",
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10000,
											"kind": "query",
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/aged_debtor/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "aged_debtor",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"$action": "fact",
									"exist": []any{
										"aggregate",
										"cut",
										"drilldown",
										"order",
										"page",
										"pagesize",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"aged_debtor",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "aggregate",
											"orig": "aggregate",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10000,
											"kind": "query",
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/aged_debtor_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "aged_debtor_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"aggregate",
										"cut",
										"drilldown",
										"order",
										"page",
										"pagesize",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"aged_debtor_v2",
									"facts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cells",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "summary",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total_cell_count",
						"short": "Total number of cells in the result",
						"type": "`$INTEGER`",
					},
				},
				"name": "fact",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/audit_opinions/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "audit_opinions",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"audit_opinions",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/bsheet/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "bsheet",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"bsheet",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/capital/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "capital",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"capital",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/capital_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "capital_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"capital_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/cflow/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "cflow",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"cflow",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/cflow_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "cflow_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"cflow_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/conditional_grants/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "conditional_grants",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"conditional_grants",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/demarcation_changes/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "demarcation_changes",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"demarcation_changes",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/financial_position_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "financial_position_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"financial_position_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/grants_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "grants_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"grants_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/incexp/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "incexp",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"incexp",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/incexp_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "incexp_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"incexp_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/municipalities/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "municipalities",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"municipalities",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/officials/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "officials",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"officials",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/repmaint/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "repmaint",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"repmaint",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/repmaint_v2/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "repmaint_v2",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"repmaint_v2",
									"facts",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cubes/uifwexp/facts",
								"segments": []any{
									map[string]any{
										"lit": "cubes",
									},
									map[string]any{
										"lit": "uifwexp",
									},
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cubes",
									"uifwexp",
									"facts",
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
