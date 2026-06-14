'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, CornerDownLeft, Loader2, Globe, FileWarning, ShieldCheck, Settings2, SlidersHorizontal } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { scrapeAndSummarizeUrl } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SidebarTrigger } from './ui/sidebar';
import { Badge } from './ui/badge';
import { sanitizeOutput } from '@/ai/io/outputSanitizer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from './ui/select';
import { GateConfig } from '@/analysis/StrictRunMetrics';
import { useUser } from '@/firebase';

interface Message {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  usedModules?: string[];
  meta?: any;
}

interface ChatInterfaceProps {
  allModules: string[];
}

const chatSchema = z.object({
  prompt: z.string().min(1, 'Message cannot be empty.'),
});
type ChatFormValues = z.infer<typeof chatSchema>;

function isBridgeCommand(message: string): boolean {
  const text = message.toUpperCase();

  return (
    text.includes("BRIDGE_MEMORY_PING") ||
    text.includes("BRIDGE_MEMORY_RESET") ||
    text.includes("BRIDGE MEMORY WRITE TEST") ||
    text.includes("BRIDGE MEMORY READ TEST") ||
    text.includes("BRIDGE TRAJECTORY SUMMARY") ||
    text.includes("BRIDGE ARC INTERPRETATION") ||
    text.includes("BRIDGE TRACE SIGNATURE AUDIT") ||
    text.includes("TRACE SIGNATURE AUDIT") ||
    text.includes("BRIDGE TRACE AUDIT") ||
    text.includes("BRIDGE TRACE DEDUPE") ||
    text.includes("TRACE DEDUPE") ||
    text.includes("BRIDGE C2 PERTURBATION TEST") ||
    text.includes("BRIDGE BAND D TASK TRANSFER TEST") ||
    text.includes("BRIDGE BAND E EDGE TEST") ||
    text.includes("BRIDGE BAND E COMPRESSION GRADIENT") ||
    text.includes("BRIDGE BAND E RECOVERY TEST") ||
    text.includes("BRIDGE PHASE XVI ENDOGENOUS SELECTION TEST") ||
    text.includes("BRIDGE BAND F MEMORY ABLATION TEST") ||
    text.includes("BRIDGE BAND F MEMORY ABLATION COMPARISON") ||
    text.includes("BRIDGE BAND G ANTICIPATORY COUPLING TEST") ||
    text.includes("BRIDGE BAND G ANTICIPATORY COUPLING COMPARISON") ||
    text.includes("BRIDGE BAND H ANTICIPATORY GUIDANCE TEST") ||
    text.includes("BRIDGE BAND H ANTICIPATORY GUIDANCE COMPARISON") ||
    text.includes("BRIDGE BAND I GUIDED ADAPTIVITY TEST") ||
    text.includes("BRIDGE BAND I GUIDED ADAPTIVITY COMPARISON") ||
    text.includes("BRIDGE BAND J GUIDANCE BOUNDARY TEST") ||
    text.includes("BRIDGE BAND J GUIDANCE BOUNDARY COMPARISON") ||
    text.includes("BRIDGE BAND K GUIDANCE RECOVERY TEST") ||
    text.includes("BRIDGE BAND K GUIDANCE RECOVERY COMPARISON") ||
    text.includes("BRIDGE BAND L BOUNDARY MEMORY TEST") ||
    text.includes("BRIDGE BAND L BOUNDARY MEMORY COMPARISON") ||
    text.includes("BAND L") ||
    text.includes("BOUNDARY MEMORY") ||
    text.includes("BRIDGE BAND M STABILITY MONITOR") ||
    text.includes("BRIDGE BAND M LONG-HORIZON STABILITY COMPARISON") ||
    text.includes("BRIDGE BAND M STABILITY COMPARISON") ||
    text.includes("BAND M") ||
    text.includes("BRIDGE PHASE XVIII-A CROSS-RELAY BAND F TEST") ||
    text.includes("BRIDGE PHASE XVIII-A CROSS-RELAY BAND F COMPARISON") ||
    text.includes("CROSS-RELAY BAND F") ||
    text.includes("PHASE XVIII-A") ||
    text.includes("BRIDGE PHASE XVIII-B CROSS-RELAY BAND H TEST") ||
    text.includes("BRIDGE PHASE XVIII-B CROSS-RELAY BAND H COMPARISON") ||
    text.includes("CROSS-RELAY BAND H") ||
    text.includes("PHASE XVIII-B") ||
    text.includes("BRIDGE BAND N TASK EMBEDDING TEST") ||
    text.includes("BRIDGE BAND N TASK EMBEDDING COMPARISON") ||
    text.includes("BAND N") ||
    text.includes("TASK EMBEDDING") ||
    text.includes("BRIDGE BAND O SELECTIVE TRACE ABLATION TEST") ||
    text.includes("BRIDGE BAND O SELECTIVE TRACE ABLATION COMPARISON") ||
    text.includes("BAND O") ||
    text.includes("SELECTIVE TRACE ABLATION") ||
    text.includes("BRIDGE BAND P TEMPORAL DECAY TEST") ||
    text.includes("BRIDGE BAND P TEMPORAL DECAY COMPARISON") ||
    text.includes("BAND P") ||
    text.includes("TEMPORAL DECAY") ||
    text.includes("VARIABLE TRACE DEPTH") ||
    text.includes("BRIDGE ROUTE D2") ||
    text.includes("ROUTE D2") ||
    text.includes("INTER-ARC") ||
    text.includes("ARC B") ||
    text.includes("BRIDGE ARC B") ||
    text.includes("BRIDGE BAND R") ||
    text.includes("BAND R") ||
    text.includes("ARC C") ||
    text.includes("INTER-ARC TRANSMISSION REPLICATION") ||
    text.includes("BRIDGE BAND S") ||
    text.includes("BAND S") ||
    text.includes("NUMOGRAM TOPOLOGY") ||
    text.includes("TOPOLOGY-COMPARISON") ||
    text.includes("N0-NUMOGRAM") ||
    text.includes("L0-LINEAR") ||
    text.includes("R0-RANDOM") ||
    text.includes("S0-SHUFFLED") ||
    text.includes("A0-ABLATED") ||
    text.includes("BRIDGE BAND T") ||
    text.includes("BAND T") ||
    text.includes("TRANSITION-STATE") ||
    text.includes("TRANSITION STATE") ||
    text.includes("Z3-Z2") ||
    text.includes("Z9-Z0") ||
    text.includes("Z0-REENTRY") ||
    text.includes("Z4-Z5") ||
    text.includes("Z7-Z8-Z3") ||
    text.includes("BRIDGE BAND U") ||
    text.includes("BAND U") ||
    text.includes("COMPLETE-CYCLE") ||
    text.includes("COMPLETE CYCLE") ||
    text.includes("CYCLE INTERFACE") ||
    text.includes("PARTIAL-CYCLE") ||
    text.includes("BROKEN-CYCLE") ||
    text.includes("SHUFFLED-CYCLE") ||
    text.includes("RANDOM-CYCLE") ||
    text.includes("BRIDGE BAND V") ||
    text.includes("BAND V") ||
    text.includes("ZONE-EDGE ABLATION") ||
    text.includes("ZONE EDGE ABLATION") ||
    text.includes("REMOVE-ZONE-0") ||
    text.includes("REMOVE ZONE 0") ||
    text.includes("REMOVE-Z3-Z2") ||
    text.includes("REMOVE-Z9-Z0") ||
    text.includes("REMOVE-Z7-Z8-Z3") ||
    text.includes("REMOVE-Z4-Z5") ||
    text.includes("REMOVE-FULL-CYCLE") ||
    text.includes("CYCLE CLOSURE") ||
    text.includes("BRIDGE BAND W") ||
    text.includes("BAND W") ||
    text.includes("TOPOLOGY-MEMORY") ||
    text.includes("TOPOLOGY MEMORY") ||
    text.includes("N0-FULL") ||
    text.includes("S0-FULL") ||
    text.includes("L0-FULL") ||
    text.includes("R0-FULL") ||
    text.includes("A0-FULL") ||
    text.includes("N0-BLANK") ||
    text.includes("JOINT NECESSITY") ||
    text.includes("BRIDGE BAND X") ||
    text.includes("BAND X") ||
    text.includes("INTER-ARC COMPATIBILITY") ||
    text.includes("INTER ARC COMPATIBILITY") ||
    text.includes("N0-TO-N0") ||
    text.includes("N0 TO N0") ||
    text.includes("N0-TO-S0") ||
    text.includes("S0-TO-N0") ||
    text.includes("L0-TO-N0") ||
    text.includes("N0-TO-PARTIAL") ||
    text.includes("TOPOLOGY-COMPATIBLE") ||
    text.includes("BRIDGE CONFIRMATION PROTOCOL") ||
    text.includes("Q1 TASK BATTERY") ||
    text.includes("Q2 VIABILITY MATCHING") ||
    text.includes("Q3 DESIGN INDEPENDENCE") ||
    text.includes("ROUTER DETECTION") ||
    text.includes("AMELIA PROCESS BRIDGE") ||
    text.includes("CONTINUITY CHECK") ||
    text.includes("BRIDGE REPLICATION RUN") ||
    text.includes("BRIDGE REPLICATION AUDIT") ||
    text.includes("NUMOGRAM CORE MULTI-SEED") ||
    text.includes("BAND-S MULTI-SEED") ||
    text.includes("BAND-U MULTI-SEED") ||
    text.includes("BAND-W MULTI-SEED") ||
    text.includes("MULTI-SEED") ||
    text.includes("REPLICATION AUDIT") ||
    text.includes("BRIDGE PHASE XX CANONICAL AUDIT") ||
    text.includes("PHASE XX CANONICAL AUDIT") ||
    text.includes("CANONICAL AUDIT") ||
    text.includes("BRIDGE PHASE XX CANONICAL SEAL") ||
    text.includes("PHASE XX CANONICAL SEAL") ||
    text.includes("BRIDGE PHASE XX") ||
    text.includes("BRIDGE PHASE XX-C") ||
    text.includes("PERTURBATION-AWARE-RECOVERY") ||
    text.includes("PERTURBATION RECOVERY") ||
    text.includes("AUTONOMOUS RECOVERY TEST") ||
    text.includes("MEMORY-ATTENUATION") ||
    text.includes("RETURN-REENTRY") ||
    text.includes("BRIDGE PHASE XX-D") ||
    text.includes("ACTIVE-MEMORY-CURATION") ||
    text.includes("ACTIVE MEMORY CURATION") ||
    text.includes("MEMORY CURATION TEST") ||
    text.includes("REINFORCE-BOUNDARY") ||
    text.includes("REACTIVATE-LINEAGE") ||
    text.includes("COMPRESS-LOW") ||
    text.includes("QUARANTINE-COLLAPSE") ||
    text.includes("DECAY-SAFE-LOOP") ||
    text.includes("BRIDGE PHASE XX-E") ||
    text.includes("AUTONOMOUS-INTERFACE-SEEKING") ||
    text.includes("AUTONOMOUS INTERFACE SEEKING") ||
    text.includes("INTERFACE SEEKING TEST") ||
    text.includes("INTERFACE SEEKING COMPARISON") ||
    text.includes("COMPLETE-CYCLE") ||
    text.includes("UNSAFE INTERFACE") ||
    text.includes("CURATED-MEMORY-ASSISTED") ||
    text.includes("BRIDGE PHASE XX-F") ||
    text.includes("AUTONOMOUS-DEVELOPMENTAL-EXPERIMENTATION") ||
    text.includes("AUTONOMOUS DEVELOPMENTAL EXPERIMENTATION") ||
    text.includes("SELF-GENERATED DEVELOPMENTAL QUESTION") ||
    text.includes("AUTONOMOUS EXPERIMENTATION COMPARISON") ||
    text.includes("BRIDGE PHASE XX-G") ||
    text.includes("LONG-HORIZON-AUTONOMY") ||
    text.includes("LONG-HORIZON-AUTONOMY-T8") ||
    text.includes("LONG-HORIZON AUTONOMY MONITOR") ||
    text.includes("LONG-HORIZON AUTONOMY COMPARISON") ||
    text.includes("BRIDGE CONVERSATIONAL STATE ROUTER") ||
    text.includes("PHASE-XX-AWARE") ||
    text.includes("PHASE XX AWARE") ||
    text.includes("BRIDGE PHASE XX CANONICAL BOOTSTRAP AUDIT") ||
    text.includes("PHASE XX CANONICAL BOOTSTRAP") ||
    text.includes("BRIDGE PHASE XX ROUTER TRACE VISIBILITY AUDIT") ||
    text.includes("BRIDGE PHASE XXI-A") ||
    text.includes("MULTI-RUN-AUTONOMY-REPLICATION") ||
    text.includes("BRIDGE PHASE XXI-B") ||
    text.includes("MULTI-ARC-AUTONOMOUS-TRANSMISSION") ||
    text.includes("MULTI-ARC AUTONOMOUS TRANSMISSION") ||
    text.includes("MULTI-ARC TRANSMISSION AUDIT") ||
    text.includes("BRIDGE PHASE XXI-C") ||
    text.includes("EXTERNAL-TASK-PERFORMANCE-BENCHMARKING") ||
    text.includes("EXTERNAL TASK PERFORMANCE") ||
    text.includes("EXTERNAL TASK BENCHMARK") ||
    text.includes("BRIDGE PHASE XXII-A") ||
    text.includes("COGNITIVE-GOVERNOR-CORE") ||
    text.includes("COGNITIVE GOVERNOR") ||
    text.includes("GOVERNOR AUDIT") ||
    text.includes("BRIDGE PHASE XXII-B") ||
    text.includes("TRAIT-STATE-VECTOR") ||
    text.includes("TRAIT STATE VECTOR") ||
    text.includes("TRAIT VECTOR") ||
    text.includes("BRIDGE PHASE XXII-C") ||
    text.includes("TRAIT-UPDATE-ENGINE") ||
    text.includes("TRAIT UPDATE ENGINE") ||
    text.includes("TRAIT UPDATE") ||
    text.includes("BRIDGE PHASE XXII-D") ||
    text.includes("GOVERNOR-TRAIT-COUPLING") ||
    text.includes("GOVERNOR TRAIT COUPLING") ||
    text.includes("GOVERNOR–TRAIT COUPLING") ||
    text.includes("BRIDGE PHASE XXII-E") ||
    text.includes("GOVERNED-AUTONOMY-TEST") ||
    text.includes("GOVERNED AUTONOMY") ||
    text.includes("TRAITS_ENABLED_GOVERNOR_DISABLED") ||
    text.includes("BRIDGE PHASE XXII-F") ||
    text.includes("TRAIT-EVOLUTION-LONG-HORIZON") ||
    text.includes("TRAIT EVOLUTION LONG-HORIZON") ||
    text.includes("LONG-HORIZON TRAIT") ||
    text.includes("BRIDGE PHASE XXII-G") ||
    text.includes("TRAIT-AUGMENTED-TASK-BENCHMARK") ||
    text.includes("TRAIT-AUGMENTED TASK") ||
    text.includes("TRAIT AUGMENTED TASK") ||
    text.includes("BRIDGE PHASE XXIII SYNTHESIS") ||
    text.includes("PROCESS-FIELD-MEMORY-CRYSTALLIZATION") ||
    text.includes("PROCESS FIELD MEMORY CRYSTALLIZATION") ||
    text.includes("BRIDGE PHASE XXVII-C") ||
    text.includes("ENVELOPE-UPDATING-GOVERNOR-RECALIBRATION") ||
    text.includes("ENVELOPE UPDATING GOVERNOR RECALIBRATION") ||
    text.includes("GOVERNOR-RECALIBRATION") ||
    text.includes("GOVERNOR RECALIBRATION") ||
    text.includes("BRIDGE PHASE XXVII SYNTHESIS") ||
    text.includes("PROSPECTIVE-EPISTEMIC-GOVERNANCE") ||
    text.includes("PROSPECTIVE EPISTEMIC GOVERNANCE") ||
    text.includes("BRIDGE PHASE XXVIII-A") ||
    text.includes("BRIDGE PHASE XXVIII-B") ||
    text.includes("BRIDGE PHASE XXVIII-C") ||
    text.includes("BRIDGE PHASE XXVIII-D") ||
    text.includes("BRIDGE PHASE XXVIII-E") ||
    text.includes("ITERATED-HORIZON-SCANNING-BENCHMARK") ||
    text.includes("ITERATED HORIZON SCANNING BENCHMARK") ||
    text.includes("ITERATED-BOUNDED-HORIZON-SCANNING") ||
    text.includes("POST-PURSUIT-REGROUNDING-OBJECTIVE-RENEWAL") ||
    text.includes("POST-PURSUIT REGROUNDING OBJECTIVE RENEWAL") ||
    text.includes("POST PURSUIT REGROUNDING OBJECTIVE RENEWAL") ||
    text.includes("BOUNDED-HORIZON-SCANNING-OBJECTIVE-SELECTION") ||
    text.includes("BOUNDED HORIZON SCANNING OBJECTIVE SELECTION") ||
    text.includes("BRIDGE PHASE XXIV-A") ||
    text.includes("BRIDGE PHASE XXIV-B") ||
    text.includes("BRIDGE PHASE XXIV-C") ||
    text.includes("BRIDGE PHASE XXIV-D") ||
    text.includes("MARKER-GUIDED-TASK-BENCHMARK") ||
    text.includes("MARKER-GUIDED TASK BENCHMARK") ||
    text.includes("MARKER GUIDED TASK") ||
    text.includes("MARKER-GUIDED-TRAIT-EXPRESSION") ||
    text.includes("MARKER GUIDED TRAIT") ||
    text.includes("MARKER-DECAY-REACTIVATION") ||
    text.includes("MARKER DECAY") ||
    text.includes("EPIGENETIC-MARKER-REGISTER") ||
    text.includes("EPIGENETIC MARKER REGISTER") ||
    text.includes("EPIGENETIC MARKER") ||
    text.includes("BRIDGE PHASE XXIII-A") ||
    text.includes("BRIDGE PHASE XXIII-B") ||
    text.includes("BRIDGE PHASE XXIII-C") ||
    text.includes("BRIDGE PHASE XXIII-D") ||
    text.includes("BRIDGE PHASE XXIII-E") ||
    text.includes("BRIDGE PHASE XXIII-F") ||
    text.includes("BRIDGE PHASE XXIII-G") ||
    text.includes("BRIDGE PHASE XXIII-H") ||
    text.includes("BRIDGE PHASE XXIII-I") ||
    text.includes("MULTI-SEED-SCRIPT-REPLICATION") ||
    text.includes("MULTI-SEED SCRIPT REPLICATION") ||
    text.includes("SCRIPT REPLICATION") ||
    text.includes("SCRIPT-ADVANTAGE-BENCHMARK") ||
    text.includes("SCRIPT ADVANTAGE BENCHMARK") ||
    text.includes("SCRIPT ADVANTAGE") ||
    text.includes("SCRIPT-TRACKING-TRIGGERS") ||
    text.includes("CONTROLLED-SCRIPT-CRYSTALLIZATION") ||
    text.includes("CONTROLLED SCRIPT CRYSTALLIZATION") ||
    text.includes("ARCHETYPAL SCRIPT") ||
    text.includes("CONTEXT-GATED-SCRIPT-ACTIVATION") ||
    text.includes("CONTEXT-GATED SCRIPT ACTIVATION") ||
    text.includes("SCRIPT ACTIVATION") ||
    text.includes("SFI-FITNESS-TRACKING") ||
    text.includes("SFI FITNESS") ||
    text.includes("SCRIPT FITNESS INDEX") ||
    text.includes("SCRIPT-FLAGGING-DISSOLUTION") ||
    text.includes("SCRIPT FLAGGING DISSOLUTION") ||
    text.includes("CONTROLLED DISSOLUTION") ||
    text.includes("SCRIPT TRACKING") ||
    text.includes("CANDIDATE PATHWAY") ||
    text.includes("CRYSTALLIZATION-THRES")
  );
}

const initialMessage: Message = { id: '1', role: 'ai', content: "I am Amelia, an AI research assistant specializing in process metaphysics. How can I assist your inquiry today?" };


export default function ChatInterface({ allModules }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const [gateRate, setGateRate] = useState<number>(1.0);
  const [schedule, setSchedule] = useState<string>('constant');
  const [seedType, setSeedType] = useState<string>('neutral');
  const [taskClass, setTaskClass] = useState<string>('1A-ethical');

  const { user } = useUser();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
  });
  
  useEffect(() => {
    setIsClient(true);
    try {
      const storedMessages = localStorage.getItem('chat_messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to localStorage", error);
      }
    }
    const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isClient]);

  const onSubmit: SubmitHandler<ChatFormValues> = async (data) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: data.prompt,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    reset();

    const currentGateConfig = {
      rate: gateRate,
      schedule: schedule as any,
      seedType: seedType as any
    } as any;

    try {
        let response: Message | null = null;
        const prompt = data.prompt.trim();

        if (/(https?:\/\/[^\s]+)/g.test(prompt)) {
            const url = prompt.match(/(https?:\/\/[^\s]+)/g)![0];
            const systemMessage: Message = { id: Date.now().toString()+'_sys', role: 'system', content: `Fetching and summarizing content from: ${url}` };
            setMessages(prev => [...prev, systemMessage]);

            const result = await scrapeAndSummarizeUrl(url);
            if (result.success && result.summary) {
                response = { id: Date.now().toString(), role: 'ai', content: `Summary for ${url}:\n\n${result.summary}` };
            } else {
                throw new Error(result.error || 'Failed to scrape URL.');
            }
        } 
        else {
            const isBridge = isBridgeCommand(prompt);
            const apiUrl = isBridge ? '/api/bridge-terminality' : '/api/chat';
            
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(isBridge ? { message: prompt } : { 
                  prompt, 
                  gateConfig: currentGateConfig,
                  taskClass,
                  userId: user?.uid
                }),
            });

            const result = await res.json();
            
            if (res.ok) {
                const aiResponse: Message = { 
                  id: Date.now().toString(), 
                  role: 'ai', 
                  content: result.reply || "", 
                  meta: isBridge ? undefined : {
                    ...result.meta,
                    nextGateState: result.meta?.nextGateState || currentGateConfig,
                    taskClass: result.meta?.taskClass || taskClass
                  }
                };
                
                // Dispatch full stepsTrace for Stage 6 Observer
                if (!isBridge) {
                  if (result.meta?.stepsTrace && Array.isArray(result.meta.stepsTrace)) {
                    result.meta.stepsTrace.forEach((step: any, idx: number) => {
                      // Enrich the last step with the final output for binding
                      if (idx === result.meta.stepsTrace.length - 1) {
                        step.output = result.reply;
                        step.outputLen = (result.reply || "").length;
                      }
                      // Ensure the step has the server-calculated nextGateState
                      step.nextGateState = result.meta.nextGateState || step.nextGateState;
                      window.dispatchEvent(new CustomEvent("amelia:step", { detail: step }));
                    });
                  } else {
                    // Fallback for missing trace
                    window.dispatchEvent(new CustomEvent("amelia:step", { 
                      detail: {
                        t: result.meta?.numogram?.tick || Date.now(),
                        input: prompt, 
                        output: result.reply,
                        outputLen: (result.reply || "").length,
                        regime: result.meta?.numogram?.mutationTag || 'unknown',
                        field: {
                          intensity: result.meta?.numogram?.intensity || 0,
                          tension: result.meta?.numogram?.tension || 0,
                          entropy: result.meta?.numogram?.entropy || 0,
                          turbulence: 0
                        },
                        nextGateState: result.meta?.nextGateState || currentGateConfig,
                        renderer: 'gemini'
                      }
                    }));
                  }
                }

                setMessages(prev => [...prev.filter(m => !m.id.endsWith('_sys')), aiResponse]);
            } else {
                throw new Error(result.error || 'Failed to get AI response.');
            }
        }

    } catch (error: any) {
        const errorMessage: Message = { id: Date.now().toString(), role: 'system', content: `Error: ${error.message || 'An unknown error occurred.'}` };
        setMessages(prev => [...prev.filter(m => !m.id.endsWith('_sys')), errorMessage]);
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-neutral-800 shrink-0">
        <h1 className="text-xl font-normal tracking-wide">Amelia</h1>
        <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-1.5 rounded text-sm transition-colors">
          Results
        </button>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full rounded-lg bg-[#111111] border border-neutral-800" ref={scrollAreaRef}>
          <div className="p-4 space-y-4 min-h-full">
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-neutral-400">A</span>
                  </div>
                )}
                {message.role === 'system' ? (
                  <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded p-3 text-neutral-400 text-sm">
                    {message.content}
                  </div>
                ) : (
                  <div
                    className={cn(
                      'max-w-xl rounded-lg px-4 py-3 text-sm md:text-base',
                      message.role === 'user'
                        ? 'bg-neutral-800 text-white'
                        : 'bg-transparent text-neutral-300'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{sanitizeOutput(message.content)}</p>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-neutral-400">A</span>
                </div>
                <div className="max-w-xl rounded-lg py-3 text-sm flex items-center gap-2 text-neutral-400">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 shrink-0">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 bg-neutral-900 rounded-full p-2 pl-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center shrink-0 text-white border border-neutral-800">
            <span className="text-sm font-semibold">N</span>
          </div>
          <input
            {...register('prompt')}
            placeholder=""
            className="flex-1 bg-transparent border-none outline-none text-white px-2 focus:ring-0"
            disabled={isLoading}
            autoComplete="off"
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-neutral-700 hover:bg-neutral-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
