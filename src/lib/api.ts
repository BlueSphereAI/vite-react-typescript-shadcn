const API_BASE_URL = 'https://16625-v4-be.deepsphere.one'

interface ApiResponse<T> {
  data: T | null
  error?: string
}

// Types
export interface Procedure {
  uuid: string
  name: string
  description: string
}

export interface Facility {
  uuid: string
  name: string
  location: string
  certifications: string
  doctor_info: string
  patient_reviews: string
}

export interface PriceComparison {
  uuid: string
  procedure_id: string
  facility_id: string
  us_price: number
  international_price: number
  travel_cost: number
}

export interface Booking {
  uuid: string
  user_id: string
  facility_id: string
  procedure_id: string
  itinerary: string
  status: 'pending' | 'confirmed' | 'completed'
  preferred_date: string
}

// Procedures API
export const proceduresApi = {
  getAll: async (): Promise<ApiResponse<Procedure[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures`)
      if (!response.ok) throw new Error('Failed to fetch procedures')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: error instanceof Error ? error.message : 'Failed to fetch procedures' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<Procedure>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures/${id}`)
      if (!response.ok) throw new Error('Failed to fetch procedure details')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch procedure details' }
    }
  },

  create: async (data: Omit<Procedure, 'uuid'>): Promise<ApiResponse<Procedure>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create procedure')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create procedure' }
    }
  },

  update: async (id: string, data: Partial<Omit<Procedure, 'procedure_id'>>): Promise<ApiResponse<Procedure>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update procedure')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update procedure' }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete procedure')
      return { data: undefined }
    } catch (error) {
      return { data: undefined, error: error instanceof Error ? error.message : 'Failed to delete procedure' }
    }
  }
}

// Facilities API
export const facilitiesApi = {
  getAll: async (): Promise<ApiResponse<Facility[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities`)
      if (!response.ok) throw new Error('Failed to fetch facilities')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: error instanceof Error ? error.message : 'Failed to fetch facilities' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<Facility>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities/${id}`)
      if (!response.ok) throw new Error('Failed to fetch facility details')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch facility details' }
    }
  },

  create: async (data: Omit<Facility, 'facility_id'>): Promise<ApiResponse<Facility>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create facility')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create facility' }
    }
  },

  update: async (id: string, data: Partial<Omit<Facility, 'facility_id'>>): Promise<ApiResponse<Facility>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update facility')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update facility' }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete facility')
      return { data: undefined }
    } catch (error) {
      return { data: undefined, error: error instanceof Error ? error.message : 'Failed to delete facility' }
    }
  }
}

// Price Comparisons API
export const priceComparisonsApi = {
  getAll: async (): Promise<ApiResponse<PriceComparison[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons`)
      if (!response.ok) throw new Error('Failed to fetch price comparisons')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: error instanceof Error ? error.message : 'Failed to fetch price comparisons' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<PriceComparison>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons/${id}`)
      if (!response.ok) throw new Error('Failed to fetch price comparison details')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch price comparison details' }
    }
  },

  create: async (data: Omit<PriceComparison, 'comparison_id'>): Promise<ApiResponse<PriceComparison>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create price comparison')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create price comparison' }
    }
  },

  update: async (id: string, data: Partial<Omit<PriceComparison, 'comparison_id'>>): Promise<ApiResponse<PriceComparison>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update price comparison')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update price comparison' }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete price comparison')
      return { data: undefined }
    } catch (error) {
      return { data: undefined, error: error instanceof Error ? error.message : 'Failed to delete price comparison' }
    }
  }
}

// Bookings API
export const bookingsApi = {
  getAll: async (): Promise<ApiResponse<Booking[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`)
      if (!response.ok) throw new Error('Failed to fetch bookings')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: error instanceof Error ? error.message : 'Failed to fetch bookings' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<Booking>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`)
      if (!response.ok) throw new Error('Failed to fetch booking details')
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch booking details' }
    }
  },

  create: async (data: Omit<Booking, 'booking_id'>): Promise<ApiResponse<Booking>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create booking')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create booking' }
    }
  },

  update: async (id: string, data: Partial<Omit<Booking, 'booking_id'>>): Promise<ApiResponse<Booking>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update booking')
      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update booking' }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete booking')
      return { data: undefined }
    } catch (error) {
      return { data: undefined, error: error instanceof Error ? error.message : 'Failed to delete booking' }
    }
  }
} 