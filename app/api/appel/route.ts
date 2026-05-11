import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { supabaseAdmin } from '@/lib/supabase-admin'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: NextRequest) {
  try {
    const { livraison_id, client_telephone, driver_id } = await req.json()

    if (!livraison_id || !client_telephone || !driver_id) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="fr-FR">
    Bonjour, votre livreur sera en bas de chez vous dans deux minutes. Merci.
  </Say>
</Response>`

    const call = await client.calls.create({
      twiml,
      to: client_telephone,
      from: process.env.TWILIO_PHONE_NUMBER!,
    })

    await supabaseAdmin.from('appels').insert({
      livraison_id,
      driver_id,
      type_appel: 'premier_appel',
      statut_appel: 'repondu',
      twilio_call_sid: call.sid,
    })

    await supabaseAdmin
      .from('livraisons')
      .update({ statut: 'appele' })
      .eq('id', livraison_id)

    return NextResponse.json({ success: true, call_sid: call.sid })

  } catch (error) {
    console.error('Erreur appel Twilio:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
