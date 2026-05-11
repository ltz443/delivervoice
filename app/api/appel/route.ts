import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: NextRequest) {
  console.log('--- DÉBUT REQUÊTE APPEL ---')
  try {
    const body = await req.json()
    console.log('Body reçu:', body)
    
    const { client_telephone } = body
    console.log('Téléphone client extrait:', client_telephone)

    console.log('Vérification variables environnement Twilio...')
    console.log('TWILIO_ACCOUNT_SID présent:', !!process.env.TWILIO_ACCOUNT_SID)
    console.log('TWILIO_AUTH_TOKEN présent:', !!process.env.TWILIO_AUTH_TOKEN)
    console.log('TWILIO_PHONE_NUMBER présent:', !!process.env.TWILIO_PHONE_NUMBER)
    
    if (process.env.TWILIO_ACCOUNT_SID) {
        console.log('SID (début):', process.env.TWILIO_ACCOUNT_SID.slice(0, 6))
    }
    console.log('FROM:', process.env.TWILIO_PHONE_NUMBER)
    console.log('TO:', client_telephone)

    if (!client_telephone) {
      console.log('ERREUR: client_telephone manquant')
      return NextResponse.json({ error: 'Paramètre client_telephone manquant' }, { status: 400 })
    }

    console.log('Initialisation client Twilio...')
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
    console.log('Client Twilio initialisé.')

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="fr-FR">
    Bonjour, votre livreur sera en bas de chez vous dans deux minutes. Merci.
  </Say>
</Response>`
    console.log('TwiML généré:', twiml)

    console.log('Tentative de création de l\'appel Twilio...')
    const call = await client.calls.create({
      twiml,
      to: client_telephone,
      from: process.env.TWILIO_PHONE_NUMBER!,
    })
    console.log('Appel Twilio créé avec succès, SID:', call.sid)

    console.log('--- FIN REQUÊTE APPEL (SUCCÈS) ---')
    return NextResponse.json({ success: true, call_sid: call.sid })

  } catch (error) {
    console.error('--- ERREUR DANS LA ROUTE APPEL ---')
    console.error('Détails de l\'erreur:', error)
    const errMsg = error instanceof Error ? error.message : String(error)
    const errCode = (error as any)?.code
    const errStatus = (error as any)?.status
    
    console.log('Message d\'erreur:', errMsg)
    console.log('Code d\'erreur:', errCode)
    console.log('Status d\'erreur:', errStatus)

    return NextResponse.json({
      error: errMsg,
      code: errCode,
      status: errStatus,
      more: JSON.stringify(error)
    }, { status: 500 })
  }
}
