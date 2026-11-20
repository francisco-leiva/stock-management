export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      branch_stock: {
        Row: {
          created_at: string | null
          id: string
          id_branch: string | null
          id_prod: string | null
          modified_at: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          id_branch?: string | null
          id_prod?: string | null
          modified_at?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          id_branch?: string | null
          id_prod?: string | null
          modified_at?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_stock_id_branch_fkey"
            columns: ["id_branch"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_stock_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_stock_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products_public"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          cost: number | null
          created_at: string
          description: string | null
          id: string
          id_brand: string | null
          id_category: string | null
          modified_at: string | null
          price: number | null
          sku: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          id_brand?: string | null
          id_category?: string | null
          modified_at?: string | null
          price?: number | null
          sku?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          id_brand?: string | null
          id_category?: string | null
          modified_at?: string | null
          price?: number | null
          sku?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_id_brand_fkey"
            columns: ["id_brand"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_id_category_fkey"
            columns: ["id_category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          id_branch: string | null
          id_user: string | null
          name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_branch?: string | null
          id_user?: string | null
          name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_branch?: string | null
          id_user?: string | null
          name?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_branch_fkey"
            columns: ["id_branch"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          id: string
          id_prod: string | null
          id_sale: string | null
          quantity: number | null
          unit_price: number | null
        }
        Insert: {
          id?: string
          id_prod?: string | null
          id_sale?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Update: {
          id?: string
          id_prod?: string | null
          id_sale?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_id_sale_fkey"
            columns: ["id_sale"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          date: string | null
          id: string
          id_branch: string | null
          id_payment_method: string | null
          id_user: string
          total_amount: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          id_branch?: string | null
          id_payment_method?: string | null
          id_user: string
          total_amount?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          id_branch?: string | null
          id_payment_method?: string | null
          id_user?: string
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_id_branch_fkey"
            columns: ["id_branch"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_id_payment_method_fkey"
            columns: ["id_payment_method"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfer_items: {
        Row: {
          id: string
          id_prod: string | null
          id_transfer: string | null
          quantity: number
        }
        Insert: {
          id?: string
          id_prod?: string | null
          id_transfer?: string | null
          quantity: number
        }
        Update: {
          id?: string
          id_prod?: string | null
          id_transfer?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfer_items_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfer_items_id_prod_fkey"
            columns: ["id_prod"]
            isOneToOne: false
            referencedRelation: "products_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfer_items_id_transfer_fkey"
            columns: ["id_transfer"]
            isOneToOne: false
            referencedRelation: "stock_transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfers: {
        Row: {
          created_at: string
          from_branch_id: string | null
          id: string
          id_user: string | null
          to_branch_id: string | null
        }
        Insert: {
          created_at?: string
          from_branch_id?: string | null
          id?: string
          id_user?: string | null
          to_branch_id?: string | null
        }
        Update: {
          created_at?: string
          from_branch_id?: string | null
          id?: string
          id_user?: string | null
          to_branch_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfers_from_branch_id_fkey"
            columns: ["from_branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_to_branch_id_fkey"
            columns: ["to_branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      products_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          id_brand: string | null
          id_category: string | null
          modified_at: string | null
          price: number | null
          sku: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          id_brand?: string | null
          id_category?: string | null
          modified_at?: string | null
          price?: number | null
          sku?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          id_brand?: string | null
          id_category?: string | null
          modified_at?: string | null
          price?: number | null
          sku?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_id_brand_fkey"
            columns: ["id_brand"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_id_category_fkey"
            columns: ["id_category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      adjust_stock: {
        Args: {
          p_branch_id: string
          p_new_quantity: number
          p_product_id: string
        }
        Returns: undefined
      }
      create_product: {
        Args: {
          p_branch_id: string
          p_brand_id: string
          p_category_id: string
          p_cost: number
          p_description: string
          p_initial_stock: number
          p_price: number
          p_sku: string
        }
        Returns: string
      }
      create_stock_transfer: {
        Args: {
          p_from_branch: string
          p_items: Json
          p_to_branch: string
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
