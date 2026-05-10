// lib/twilio.ts
// Placeholder — Twilio sera intégré plus tard

/**
 * Déclenche un appel téléphonique au client via Twilio
 * @param telephone - Numéro de téléphone du client
 * @param message - Message vocal à diffuser
 */
export async function passerAppel(
  telephone: string,
  message: string
): Promise<{ success: boolean; callSid: string }> {
  // TODO: Twilio — implémenter l'appel réel via l'API Twilio
  // Utiliser TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
  console.log(`[MOCK] Appel vers ${telephone} avec message: "${message}"`)
  return { success: true, callSid: 'mock-call-sid' }
}

/**
 * Déclenche un rappel automatique au client
 * @param telephone - Numéro de téléphone du client
 */
export async function rappelAutomatique(
  telephone: string
): Promise<{ success: boolean; callSid: string }> {
  // TODO: Twilio — implémenter le rappel automatique
  console.log(`[MOCK] Rappel automatique vers ${telephone}`)
  return { success: true, callSid: 'mock-rappel-sid' }
}

/**
 * Vérifie le statut d'un appel en cours
 * @param callSid - Identifiant Twilio de l'appel
 */
export async function verifierStatutAppel(
  callSid: string
): Promise<{ status: string }> {
  // TODO: Twilio — vérifier le statut réel de l'appel
  console.log(`[MOCK] Vérification statut appel ${callSid}`)
  return { status: 'completed' }
}
