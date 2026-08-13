// Typed models for the MunicipalFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AgedCreditor {
  amount_sum?: number
  amount_type_code?: string
  amount_type_label?: string
  demarcation_code?: string
  demarcation_label?: string
  financial_period_period?: number
  financial_year_end_year?: number
  item_code?: string
  item_composition?: string
  item_label?: string
  item_position_in_return_form?: number
  item_return_form_structure?: string
  period_length_length?: string
}

export interface AgedCreditorListMatch {
  amount_sum?: number
  amount_type_code?: string
  amount_type_label?: string
  demarcation_code?: string
  demarcation_label?: string
  financial_period_period?: number
  financial_year_end_year?: number
  item_code?: string
  item_composition?: string
  item_label?: string
  item_position_in_return_form?: number
  item_return_form_structure?: string
  period_length_length?: string

  // Selects a custom action instead of the plain list:
  //   'fact'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgedDebtor {
  amount_sum?: number
  amount_type_code?: string
  amount_type_label?: string
  customer_group_code?: string
  demarcation_code?: string
  demarcation_label?: string
  financial_period_period?: number
  financial_year_end_year?: number
  item_code?: string
  item_composition?: string
  item_label?: string
  item_position_in_return_form?: number
  item_return_form_structure?: string
  period_length_length?: string
}

export interface AgedDebtorListMatch {
  amount_sum?: number
  amount_type_code?: string
  amount_type_label?: string
  customer_group_code?: string
  demarcation_code?: string
  demarcation_label?: string
  financial_period_period?: number
  financial_year_end_year?: number
  item_code?: string
  item_composition?: string
  item_label?: string
  item_position_in_return_form?: number
  item_return_form_structure?: string
  period_length_length?: string

  // Selects a custom action instead of the plain list:
  //   'fact'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Fact {
  cells?: any[]
  summary?: Record<string, any>
  total_cell_count?: number
}

export interface FactListMatch {
  cells?: any[]
  summary?: Record<string, any>
  total_cell_count?: number
}

