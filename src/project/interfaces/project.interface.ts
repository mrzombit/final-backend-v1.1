import { Document } from 'mongoose';

export interface Project extends Document {
    readonly user_id: string;
    readonly name: string;
    readonly industry_ids: [string];
    readonly description: string;
    readonly logo_url: string;
    readonly created_date: Date;
    readonly modified_date: Date;
    readonly sale_trends: [
        {
            year: Number,
            trend: Number,
            description: string,
        },
    ];
    readonly business_goals: [
        {
            name: {
                th: string,
                en: string,
            },
            detail: {
            },
        }
    ];
    readonly model_config: {
        projection_period: Number,
        start_date: Date,
        currency_id: string,
        working_hours: Number,
        income_tax_rate: Number,
        discounting_rate: Number,
    };
    readonly revenue: {
        service_tables: [{
            name: string,
            description: string,
            color: string,
            text_color: string,
            services: [{
                name: string,
                unit: Number,
                unit_name: string,
                serve_per_unit: Number,
                revenue_per_service: Number,
                cost_per_service: Number,
                price_increase: Number,
                price_increase_period_id: string,
                cost_increase: Number,
                cost_increase_period_id: string,
                start_date: Date,
                seasonal_trends: [Number],
            }]
        }],
        product_tables: [{
            name: string,
            description: string,
            color: string,
            text_color: string,
            products: [{
                name: string,
                days_of_inventory: {
                    days: Number,
                    months: Number,
                },
                revenue_per_unit: Number,
                cost_per_unit: Number,
                price_increase: Number,
                price_increase_period_id: string,
                cost_increase: Number,
                cost_increase_period_id: string,
                start_date: Date,
                seasonal_trends: [Number],
            }]
        }],
    };
    readonly expense: {
        investment_tables: [{
            name: string,
            description: string,
            color: string,
            text_color: string,
            investments: [{
                name: string,
                amount: Number,
                account_id: string,
                is_initial: boolean,
                start_date: Date,
            }]
        }],
        fixed_cost_tables: [{
            name: string,
            description: string,
            color: string,
            text_color: string,
            fixed_costs: [{
                name: string,
                unit: Number,
                amount: Number,
                period_id: string,
                number: [],
                start_date: Date,
                cost_increase: Number,
                cost_increase_period_id: string,
            }]
        }],
    };
    readonly miscellaneous: {
        equity_contribution: [{
            name: string,
            amount: Number,
            date: Date,
            repayment:
            {
                period_id: string,
                start_date: Date,
            }
        }],
        debt_issuance: [{
            name: string,
            amount: Number,
            apr: Number,
            period_id: string,
            start_date: Date,
            payments: [
                {
                    year: Number,
                    amount: Number,
                }
            ]
        }],
    };
    ffcReason: string;
}