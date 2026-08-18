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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "amount_type_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "amount_type_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "financial_period_period",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_composition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period_length_length",
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
								"parts": []any{
									"cubes",
									"aged_creditor",
									"facts",
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
								"parts": []any{
									"cubes",
									"aged_creditor_v2",
									"facts",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "amount_type_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "amount_type_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customer_group_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "demarcation_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "financial_period_period",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "financial_year_end_year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_composition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "item_position_in_return_form",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item_return_form_structure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period_length_length",
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
								"parts": []any{
									"cubes",
									"aged_debtor",
									"facts",
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
								"parts": []any{
									"cubes",
									"aged_debtor_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"audit_opinions",
									"facts",
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
								"parts": []any{
									"cubes",
									"bsheet",
									"facts",
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
								"parts": []any{
									"cubes",
									"capital",
									"facts",
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
								"parts": []any{
									"cubes",
									"capital_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"cflow",
									"facts",
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
								"parts": []any{
									"cubes",
									"cflow_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"conditional_grants",
									"facts",
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
								"parts": []any{
									"cubes",
									"demarcation_changes",
									"facts",
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
								"parts": []any{
									"cubes",
									"financial_position_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"grants_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"incexp",
									"facts",
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
								"parts": []any{
									"cubes",
									"incexp_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"municipalities",
									"facts",
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
								"parts": []any{
									"cubes",
									"officials",
									"facts",
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
								"parts": []any{
									"cubes",
									"repmaint",
									"facts",
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
								"parts": []any{
									"cubes",
									"repmaint_v2",
									"facts",
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
								"parts": []any{
									"cubes",
									"uifwexp",
									"facts",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
