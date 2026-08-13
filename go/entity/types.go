// Typed models for the MunicipalFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/municipal-finance-sdk/go/core"
)

// AgedCreditor is the typed data model for the aged_creditor entity.
type AgedCreditor struct {
	AmountSum *float64 `json:"amount_sum,omitempty"`
	AmountTypeCode *string `json:"amount_type_code,omitempty"`
	AmountTypeLabel *string `json:"amount_type_label,omitempty"`
	DemarcationCode *string `json:"demarcation_code,omitempty"`
	DemarcationLabel *string `json:"demarcation_label,omitempty"`
	FinancialPeriodPeriod *int `json:"financial_period_period,omitempty"`
	FinancialYearEndYear *int `json:"financial_year_end_year,omitempty"`
	ItemCode *string `json:"item_code,omitempty"`
	ItemComposition *string `json:"item_composition,omitempty"`
	ItemLabel *string `json:"item_label,omitempty"`
	ItemPositionInReturnForm *int `json:"item_position_in_return_form,omitempty"`
	ItemReturnFormStructure *string `json:"item_return_form_structure,omitempty"`
	PeriodLengthLength *string `json:"period_length_length,omitempty"`
}

// AgedCreditorListMatch is the typed request payload for AgedCreditor.ListTyped.
type AgedCreditorListMatch struct {
	AmountSum *float64 `json:"amount_sum,omitempty"`
	AmountTypeCode *string `json:"amount_type_code,omitempty"`
	AmountTypeLabel *string `json:"amount_type_label,omitempty"`
	DemarcationCode *string `json:"demarcation_code,omitempty"`
	DemarcationLabel *string `json:"demarcation_label,omitempty"`
	FinancialPeriodPeriod *int `json:"financial_period_period,omitempty"`
	FinancialYearEndYear *int `json:"financial_year_end_year,omitempty"`
	ItemCode *string `json:"item_code,omitempty"`
	ItemComposition *string `json:"item_composition,omitempty"`
	ItemLabel *string `json:"item_label,omitempty"`
	ItemPositionInReturnForm *int `json:"item_position_in_return_form,omitempty"`
	ItemReturnFormStructure *string `json:"item_return_form_structure,omitempty"`
	PeriodLengthLength *string `json:"period_length_length,omitempty"`
}

// AgedDebtor is the typed data model for the aged_debtor entity.
type AgedDebtor struct {
	AmountSum *float64 `json:"amount_sum,omitempty"`
	AmountTypeCode *string `json:"amount_type_code,omitempty"`
	AmountTypeLabel *string `json:"amount_type_label,omitempty"`
	CustomerGroupCode *string `json:"customer_group_code,omitempty"`
	DemarcationCode *string `json:"demarcation_code,omitempty"`
	DemarcationLabel *string `json:"demarcation_label,omitempty"`
	FinancialPeriodPeriod *int `json:"financial_period_period,omitempty"`
	FinancialYearEndYear *int `json:"financial_year_end_year,omitempty"`
	ItemCode *string `json:"item_code,omitempty"`
	ItemComposition *string `json:"item_composition,omitempty"`
	ItemLabel *string `json:"item_label,omitempty"`
	ItemPositionInReturnForm *int `json:"item_position_in_return_form,omitempty"`
	ItemReturnFormStructure *string `json:"item_return_form_structure,omitempty"`
	PeriodLengthLength *string `json:"period_length_length,omitempty"`
}

// AgedDebtorListMatch is the typed request payload for AgedDebtor.ListTyped.
type AgedDebtorListMatch struct {
	AmountSum *float64 `json:"amount_sum,omitempty"`
	AmountTypeCode *string `json:"amount_type_code,omitempty"`
	AmountTypeLabel *string `json:"amount_type_label,omitempty"`
	CustomerGroupCode *string `json:"customer_group_code,omitempty"`
	DemarcationCode *string `json:"demarcation_code,omitempty"`
	DemarcationLabel *string `json:"demarcation_label,omitempty"`
	FinancialPeriodPeriod *int `json:"financial_period_period,omitempty"`
	FinancialYearEndYear *int `json:"financial_year_end_year,omitempty"`
	ItemCode *string `json:"item_code,omitempty"`
	ItemComposition *string `json:"item_composition,omitempty"`
	ItemLabel *string `json:"item_label,omitempty"`
	ItemPositionInReturnForm *int `json:"item_position_in_return_form,omitempty"`
	ItemReturnFormStructure *string `json:"item_return_form_structure,omitempty"`
	PeriodLengthLength *string `json:"period_length_length,omitempty"`
}

// Fact is the typed data model for the fact entity.
type Fact struct {
	Cells *[]any `json:"cells,omitempty"`
	Summary *map[string]any `json:"summary,omitempty"`
	TotalCellCount *int `json:"total_cell_count,omitempty"`
}

// FactListMatch is the typed request payload for Fact.ListTyped.
type FactListMatch struct {
	Cells *[]any `json:"cells,omitempty"`
	Summary *map[string]any `json:"summary,omitempty"`
	TotalCellCount *int `json:"total_cell_count,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
