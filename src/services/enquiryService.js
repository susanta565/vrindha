import { supabase } from '../lib/supabase';

/**
 * Saves a new enquiry / contact lead into Supabase backend table 'enquiries'
 * 
 * @param {Object} data - Form data
 * @param {string} data.name - Client name
 * @param {string} data.phone - Phone number
 * @param {string} data.email - Email address
 * @param {string} [data.businessName] - Business or clinic name
 * @param {string} data.service - Selected service
 * @param {string} [data.message] - Message or project requirements
 * @param {string} [data.source] - Form location (e.g. 'Modal', 'Contact Page', 'Home')
 * @returns {Promise<{success: boolean, data?: any, error?: any}>}
 */
export async function saveEnquiryToSupabase(data) {
  try {
    const payload = {
      name: data.name ? data.name.trim() : '',
      phone: data.phone ? data.phone.trim() : '',
      email: data.email ? data.email.trim() : '',
      business_name: (data.businessName || data.business_name || '').trim(),
      service: data.service || 'Social Media Marketing',
      message: (data.message || '').trim(),
      source: data.source || 'Website'
    };

    const { data: result, error } = await supabase
      .from('enquiries')
      .insert([payload]);

    if (error) {
      console.warn('Supabase insertion notice:', error.message || error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (err) {
    console.warn('Supabase request note:', err);
    return { success: false, error: err };
  }
}
