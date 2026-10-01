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
						"title": "Amount Sum",
						"type": "`$NUMBER`",
						"short": "Sum of the amount",
					},
					map[string]any{
						"name": "amount_type_code",
						"title": "Amount Type Code",
						"type": "`$STRING`",
						"short": "Amount type code",
					},
					map[string]any{
						"name": "amount_type_label",
						"title": "Amount Type Label",
						"type": "`$STRING`",
						"short": "Amount type label",
					},
					map[string]any{
						"name": "demarcation_code",
						"title": "Demarcation Code",
						"type": "`$STRING`",
						"short": "Municipality demarcation code",
					},
					map[string]any{
						"name": "demarcation_label",
						"title": "Demarcation Label",
						"type": "`$STRING`",
						"short": "Municipality name",
					},
					map[string]any{
						"name": "financial_period_period",
						"title": "Financial Period Period",
						"type": "`$INTEGER`",
						"short": "Financial period number",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"title": "Financial Year End Year",
						"type": "`$INTEGER`",
						"short": "Financial year end",
					},
					map[string]any{
						"name": "item_code",
						"title": "Item Code",
						"type": "`$STRING`",
						"short": "Item code",
					},
					map[string]any{
						"name": "item_composition",
						"title": "Item Composition",
						"type": "`$STRING`",
						"short": "Item composition formula",
					},
					map[string]any{
						"name": "item_label",
						"title": "Item Label",
						"type": "`$STRING`",
						"short": "Item label",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"title": "Item Position In Return Form",
						"type": "`$INTEGER`",
						"short": "Position in return form",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"title": "Item Return Form Structure",
						"type": "`$STRING`",
						"short": "Return form structure",
					},
					map[string]any{
						"name": "period_length_length",
						"title": "Period Length Length",
						"type": "`$STRING`",
						"short": "Period length",
					},
				},
				"name": "aged_creditor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"cubes",
									"aged_creditor",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "aggregate",
											"orig": "aggregates",
											"type": "`$STRING`",
											"kind": "query",
											"example": "amount.sum",
										},
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
											"example": "financial_year_end.year:2020|demarcation.code:CPT",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
											"example": "item.code|financial_period.period",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "financial_period.period:asc",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10000,
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"aged_creditor_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "aggregate",
											"orig": "aggregates",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10000,
										},
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
						"title": "Amount Sum",
						"type": "`$NUMBER`",
						"short": "Sum of the amount",
					},
					map[string]any{
						"name": "amount_type_code",
						"title": "Amount Type Code",
						"type": "`$STRING`",
						"short": "Amount type code",
					},
					map[string]any{
						"name": "amount_type_label",
						"title": "Amount Type Label",
						"type": "`$STRING`",
						"short": "Amount type label",
					},
					map[string]any{
						"name": "customer_group_code",
						"title": "Customer Group Code",
						"type": "`$STRING`",
						"short": "Customer group code",
					},
					map[string]any{
						"name": "demarcation_code",
						"title": "Demarcation Code",
						"type": "`$STRING`",
						"short": "Municipality demarcation code",
					},
					map[string]any{
						"name": "demarcation_label",
						"title": "Demarcation Label",
						"type": "`$STRING`",
						"short": "Municipality name",
					},
					map[string]any{
						"name": "financial_period_period",
						"title": "Financial Period Period",
						"type": "`$INTEGER`",
						"short": "Financial period number",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"title": "Financial Year End Year",
						"type": "`$INTEGER`",
						"short": "Financial year end",
					},
					map[string]any{
						"name": "item_code",
						"title": "Item Code",
						"type": "`$STRING`",
						"short": "Item code",
					},
					map[string]any{
						"name": "item_composition",
						"title": "Item Composition",
						"type": "`$STRING`",
						"short": "Item composition formula",
					},
					map[string]any{
						"name": "item_label",
						"title": "Item Label",
						"type": "`$STRING`",
						"short": "Item label",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"title": "Item Position In Return Form",
						"type": "`$INTEGER`",
						"short": "Position in return form",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"title": "Item Return Form Structure",
						"type": "`$STRING`",
						"short": "Return form structure",
					},
					map[string]any{
						"name": "period_length_length",
						"title": "Period Length Length",
						"type": "`$STRING`",
						"short": "Period length",
					},
				},
				"name": "aged_debtor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"cubes",
									"aged_debtor",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "aggregate",
											"orig": "aggregates",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
											"example": "financial_year_end.year:2020|customer_group.code:households",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
											"example": "item.code|customer_group.code",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10000,
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"aged_debtor_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "aggregate",
											"orig": "aggregates",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pagesize",
											"orig": "pagesize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10000,
										},
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
						"title": "Cells",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total_cell_count",
						"title": "Total Cell Count",
						"type": "`$INTEGER`",
						"short": "Total number of cells in the result",
					},
				},
				"name": "fact",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"cubes",
									"audit_opinions",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"bsheet",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"capital",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"capital_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"cflow",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"cflow_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"conditional_grants",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"demarcation_changes",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"financial_position_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"grants_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"incexp",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"incexp_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"municipalities",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"officials",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"repmaint",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"repmaint_v2",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"cubes",
									"uifwexp",
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cells`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cut",
											"orig": "cut",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "drilldown",
											"orig": "drilldown",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cut",
										"drilldown",
									},
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
