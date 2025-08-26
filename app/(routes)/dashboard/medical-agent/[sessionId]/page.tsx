"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';

import { toast } from 'sonner';

export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string
}

type messages = {
  role: string,
  text: string
}

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  // Map each doctor to their Assistant ID stored in .env
  const getAssistantId = (specialist: string) => {
    switch (specialist) {
      case "General Physician":
        return process.env.NEXT_PUBLIC_VAPI_GENERAL_PHYSICIAN_ID!;
      case "Pediatrician":
        return process.env.NEXT_PUBLIC_VAPI_PEDIATRICIAN_ID!;
      case "Dermatologist":
        return process.env.NEXT_PUBLIC_VAPI_DERMATOLOGIST_ID!;
      case "Psychologist":
        return process.env.NEXT_PUBLIC_VAPI_PSYCHOLOGIST_ID!;
      case "Nutritionist":
        return process.env.NEXT_PUBLIC_VAPI_NUTRITIONIST_ID!;
      case "Cardiologist":
        return process.env.NEXT_PUBLIC_VAPI_CARDIOLOGIST_ID!;
      case "ENT Specialist":
        return process.env.NEXT_PUBLIC_VAPI_ENT_ID!;
      case "Orthopedic":
        return process.env.NEXT_PUBLIC_VAPI_ORTHOPEDIC_ID!;
      case "Gynecologist":
        return process.env.NEXT_PUBLIC_VAPI_GYNECOLOGIST_ID!;
      case "Dentist":
        return process.env.NEXT_PUBLIC_VAPI_DENTIST_ID!;
      default:
        throw new Error("Unknown specialist: " + specialist);
    }
  };

  const StartCall = () => {
    if (!sessionDetail) return;
    setLoading(true);
    console.log(sessionDetail)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    // ✅ get assistantId from specialist
    const assistantId = getAssistantId(sessionDetail.selectedDoctor.specialist);

    // ✅ start call with selected doctor’s Assistant
    vapi.start(assistantId);

    vapi.on('call-start', () => {
      setLoading(false);
      console.log('call-started')
      setCallStarted(true);
    });
    vapi.on('call-end', () => {
      setCallStarted(false);
    });
    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === 'partial') {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === 'final') {
          setMessages((prev: any) => [...prev, { role: role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    });

    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRoll('assistant');
    });
    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRoll('user');
    });
  };



  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;

    vapiInstance.stop();

    // Remove all .off() calls for now

    setCallStarted(false);
    setVapiInstance(null);

    const result = await GenerateReport();
    console.log('Report:', result);

    setLoading(false);
    console.log('call-ended');
    toast.success("Your Report is Generated!")
    router.replace('/dashboard')
  };



  const GenerateReport = async () => {
    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId
    })
    console.log(result.data);
    return result.data;
  }



  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'>
          <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
          {callStarted ? 'connected...' : 'Not connected'}
        </h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>

      {sessionDetail && (
        <div className='flex items-center flex-col mt-10'>
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.specialist ?? ''}
            width={120}
            height={120}
            className='h-[100px] w-[100px] object-cover rounded-full'
          />
          <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-58 xl:px:72'>
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}</h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className='text-lg'>{currentRoll} : {liveTranscript}</h2>
            )}
          </div>

          {!callStarted ? (
            <Button className='mt-20' onClick={StartCall} disabled={loading}> {loading ? <Loader className='animate-spin' /> : <PhoneCall />}
              Start call
            </Button>
          ) : (
            <Button variant={'destructive'} onClick={endCall} disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : <PhoneOff />}Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
