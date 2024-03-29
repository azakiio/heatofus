Need to install the following packages:
supabase@1.151.1
Ok to proceed? (y) export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auth: {
        Row: {
          bearer: string | null
          created_at: string | null
          id: number
          refresh_token: string | null
        }
        Insert: {
          bearer?: string | null
          created_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Update: {
          bearer?: string | null
          created_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          embedding: string | null
          id: number
          metadata: Json | null
          title: string | null
          token_count: number | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          title?: string | null
          token_count?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          title?: string | null
          token_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      favouriteMovies: {
        Row: {
          created_at: string | null
          id: number
          movie_info: Json | null
          rating: number | null
          watched: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          movie_info?: Json | null
          rating?: number | null
          watched?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: number
          movie_info?: Json | null
          rating?: number | null
          watched?: boolean | null
        }
        Relationships: []
      }
      produktivdach: {
        Row: {
          created_at: string | null
          date: string | null
          email: string | null
          flachdach: boolean | null
          flaeche: number | null
          id: number
          plz: string | null
          rechnung: string | null
          solar: boolean | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          email?: string | null
          flachdach?: boolean | null
          flaeche?: number | null
          id?: number
          plz?: string | null
          rechnung?: string | null
          solar?: boolean | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          email?: string | null
          flachdach?: boolean | null
          flaeche?: number | null
          id?: number
          plz?: string | null
          rechnung?: string | null
          solar?: boolean | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cancel_at: string | null
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          email: string | null
          id: string
          input_max: number | null
          input_usage: number | null
          name: string | null
          output_max: number | null
          output_usage: number | null
          plan: Json | null
          status: string | null
          stripe_id: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id: string
          input_max?: number | null
          input_usage?: number | null
          name?: string | null
          output_max?: number | null
          output_usage?: number | null
          plan?: Json | null
          status?: string | null
          stripe_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id?: string
          input_max?: number | null
          input_usage?: number | null
          name?: string | null
          output_max?: number | null
          output_usage?: number | null
          plan?: Json | null
          status?: string | null
          stripe_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_users: {
        Row: {
          cancel_at: string | null
          canceled_at: string | null
          created: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          email: string | null
          id: string
          name: string | null
          plan: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled_at?: string | null
          created?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id: string
          name?: string | null
          plan?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled_at?: string | null
          created?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id?: string
          name?: string | null
          plan?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          all_day: boolean | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          location: string | null
          status: string | null
          tags: string[] | null
          time: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          all_day?: boolean | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          location?: string | null
          status?: string | null
          tags?: string[] | null
          time?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          all_day?: boolean | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          location?: string | null
          status?: string | null
          tags?: string[] | null
          time?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      threads: {
        Row: {
          assistant_id: string | null
          created_at: string
          meta: Json | null
          name: string | null
          object_id: string
          owner: string | null
          type: string | null
        }
        Insert: {
          assistant_id?: string | null
          created_at?: string
          meta?: Json | null
          name?: string | null
          object_id: string
          owner?: string | null
          type?: string | null
        }
        Update: {
          assistant_id?: string | null
          created_at?: string
          meta?: Json | null
          name?: string | null
          object_id?: string
          owner?: string | null
          type?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean | null
          created_at: string
          id: number
          title: string | null
          user: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: number
          title?: string | null
          user?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: number
          title?: string | null
          user?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      document_embeddings: {
        Row: {
          category: string | null
          chunks: number | null
          pages: Json | null
          title: string | null
        }
        Relationships: []
      }
      thread_view: {
        Row: {
          assistant_id: string | null
          created_at: string | null
          email: string | null
          meta: Json | null
          name: string | null
          object_id: string | null
          owner: string | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      increment_usage:
        | {
            Args: {
              input: number
              output: number
              assistant: string
            }
            Returns: undefined
          }
        | {
            Args: {
              x: number
              assistant: string
            }
            Returns: undefined
          }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          title: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
