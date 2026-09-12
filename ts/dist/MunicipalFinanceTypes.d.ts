export interface AgedCreditor {
    amount_sum?: number;
    amount_type_code?: string;
    amount_type_label?: string;
    demarcation_code?: string;
    demarcation_label?: string;
    financial_period_period?: number;
    financial_year_end_year?: number;
    item_code?: string;
    item_composition?: string;
    item_label?: string;
    item_position_in_return_form?: number;
    item_return_form_structure?: string;
    period_length_length?: string;
}
export interface AgedCreditorListMatch {
    aggregate?: string;
    cut?: string;
    drilldown?: string;
    order?: string;
    page?: number;
    pagesize?: number;
    $action?: string;
    [action: string]: any;
}
export interface AgedDebtor {
    amount_sum?: number;
    amount_type_code?: string;
    amount_type_label?: string;
    customer_group_code?: string;
    demarcation_code?: string;
    demarcation_label?: string;
    financial_period_period?: number;
    financial_year_end_year?: number;
    item_code?: string;
    item_composition?: string;
    item_label?: string;
    item_position_in_return_form?: number;
    item_return_form_structure?: string;
    period_length_length?: string;
}
export interface AgedDebtorListMatch {
    aggregate?: string;
    cut?: string;
    drilldown?: string;
    order?: string;
    page?: number;
    pagesize?: number;
    $action?: string;
    [action: string]: any;
}
export interface Fact {
    cells?: any[];
    summary?: Record<string, any>;
    total_cell_count?: number;
}
export interface FactListMatch {
    cut?: string;
    drilldown?: string;
}
