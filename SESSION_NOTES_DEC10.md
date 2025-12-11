# Session Notes - December 10, 2025

## Current Issues to Solve

### 1. Mobile Audio Playback (CRITICAL)
**Problem:** After the initial greeting, Flower listens and types responses but does NOT speak them back.

**What works:**
- Greeting TTS plays on first mic tap (sometimes)
- Text transcription works
- AI responses appear in chat
- Desktop works perfectly

**What doesn't work:**
- Response audio doesn't play on mobile
- Audio only plays within the initial user gesture context

**Root Cause Analysis:**
- Mobile browsers require user gesture to play audio
- The initial mic tap provides gesture context, but by the time the response comes back (after recording → transcribing → AI response → TTS), the gesture context is lost
- We tried "unlocking" audio by playing silent audio on mic tap, but it's not persisting properly

### 2. Safari Mobile Viewport (UI)
**Problem:** Mic button not properly positioned on Safari mobile with bottom URL bar.

**What we tried:**
- `100vh` - Too tall, button hidden behind Safari toolbar
- `100dvh` (dynamic viewport height) - Didn't work
- `100svh` (small viewport height) - Didn't work
- JavaScript `window.innerHeight` - Works on Chrome, too short on Safari
- Subtracting 50px for Safari - Too aggressive, raised everything too high
- For "Add to Home Screen" (no URL bar), all these approaches break the layout

**Current State:** Chrome mobile works. Safari mobile has button too high. Desktop-saved PWA now has gap at bottom.

---

## What We Tried Today

### Audio Unlock Approaches (All Failed for Response Audio)
1. **Silent audio on mic tap** - Play a silent base64 MP3 to "unlock" audio context
2. **Persistent Audio element** - Create one Audio element, reuse it for all playback
3. **Awaiting unlock before proceeding** - Made handleMicClick async to wait for unlock
4. **Using unlocked audio element in playAudio** - `unlockedAudioRef.current`

**Why they failed:** The audio unlock works for the greeting (same gesture context), but response audio comes much later after network requests, losing the gesture context.

### Safari Viewport Approaches (Partially Failed)
1. CSS `100vh`, `100dvh`, `100svh` - None properly handle Safari bottom bar
2. JavaScript `window.innerHeight` - Different values on different Safari states
3. Subtracting fixed pixels for Safari - Breaks other Safari modes (PWA)

---

## Code Structure (Current State)

### Key Files
- `/components/ChatInterface.tsx` (~650 lines) - Main voice chat logic
- `/components/SidePanel.tsx` (~275 lines) - Panel container with viewport handling

### Key Functions in ChatInterface.tsx
- `handleMicClick()` - Unlocks audio, starts greeting or recording
- `greetAndListen()` - Plays greeting TTS, then starts listening
- `startRecording()` / `stopRecording()` - Voice recording with VAD
- `sendToVoiceService()` - Sends audio, parses JSON+audio response
- `playAudio()` - Attempts to play response audio (THIS IS BROKEN ON MOBILE)

### Voice Service Endpoints
- Base URL: `https://voice-chat-service-i5u9.onrender.com`
- `/tts` - Text to speech
- `/voice-chat` - Audio in → transcription + AI response + TTS audio out
- `/chat` - Text chat (no audio)

### VAD Settings
- `SILENCE_THRESHOLD = 25`
- `SILENCE_DURATION = 2000ms`
- `MIN_SPEECH_DURATION = 800ms`

---

## To-Do List for Next Session

### Priority 1: Fix Mobile Audio Playback
- [ ] Research how ChatGPT voice mode handles audio playback on mobile
- [ ] Consider Web Audio API instead of HTML5 Audio element
- [ ] Try AudioContext that stays unlocked after initial gesture
- [ ] Consider showing a "Tap to hear response" button as fallback
- [ ] Test if keeping AudioContext active prevents it from being "locked"

### Priority 2: Fix Safari Viewport
- [ ] Don't use JavaScript for viewport - revert to CSS-only approach
- [ ] Test `position: fixed; bottom: 0` for input area instead of flex layout
- [ ] Consider separate CSS for PWA mode vs browser mode
- [ ] Use CSS `@supports` to detect Safari-specific features

### Priority 3: Code Cleanup
- [ ] Remove excessive console.log statements once working
- [ ] Clean up the viewport height logic mess
- [ ] Consider simplifying the component structure

---

## Technical Notes

### Mobile Browser Audio Restrictions
- Audio can only play after user gesture (tap, click)
- Gesture context expires quickly (varies by browser)
- Web Audio API AudioContext can be "resumed" but also has restrictions
- Some apps work around this by playing audio immediately on each tap

### Safari Bottom Toolbar Behavior
- Shows by default when page loads
- Hides when user scrolls down
- `100vh` includes the hidden area
- `100dvh`/`100svh` supposed to help but browser support varies
- `window.innerHeight` changes as toolbar shows/hides
- PWA mode (Add to Home Screen) has no toolbar - fixed viewport

---

## Session Summary
Started: Trying to make voice chat work on mobile
Ended: Greeting works, response audio doesn't play, Safari UI broken

The core issue is mobile browser audio restrictions. The greeting plays because it's within the mic tap gesture context. Response audio doesn't play because too much time passes (recording → API call → response).

Need to find a solution that either:
1. Keeps audio context alive throughout the conversation
2. Uses a different audio API that persists better
3. Requires user tap to play each response (not ideal but functional)
