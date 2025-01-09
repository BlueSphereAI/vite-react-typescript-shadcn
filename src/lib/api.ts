const API_BASE_URL = 'https://16625-v4-be.deepsphere.one'

interface ApiResponse<T> {
  data: T
  error?: string
}

// Procedures API
export const proceduresApi = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: 'Failed to fetch procedures' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/procedures/${id}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to fetch procedure details' }
    }
  }
}

// Facilities API
export const facilitiesApi = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: 'Failed to fetch facilities' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities/${id}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to fetch facility details' }
    }
  }
}

// Price Comparisons API
export const priceComparisonsApi = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: 'Failed to fetch price comparisons' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/price_comparisons/${id}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to fetch price comparison details' }
    }
  }
}

// Bookings API
export const bookingsApi = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: [], error: 'Failed to fetch bookings' }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to fetch booking details' }
    }
  },

  create: async (bookingData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to create booking' }
    }
  },

  update: async (id: string, bookingData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { data: null, error: 'Failed to update booking' }
    }
  }
} 