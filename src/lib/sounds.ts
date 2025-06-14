class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    if (typeof window !== "undefined" && "AudioContext" in window) {
      this.audioContext = new AudioContext();
    }
  }

  // Create XP click sound programmatically
  private createClickSound(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.1; // 100ms
    const buffer = this.audioContext.createBuffer(
      1,
      sampleRate * duration,
      sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Generate a click sound similar to Windows XP
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Create a short click with frequency modulation
      const frequency = 800 * Math.exp(-t * 20);
      const amplitude = Math.exp(-t * 30);
      data[i] = amplitude * Math.sin(2 * Math.PI * frequency * t) * 0.3;
    }

    return buffer;
  }

  private createStartupSound(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 1.5; // 1.5 seconds
    const buffer = this.audioContext.createBuffer(
      1,
      sampleRate * duration,
      sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Generate Windows XP startup sound-like sequence
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Create ascending chord-like sound
      const freq1 = 262 + t * 200; // C note rising
      const freq2 = 330 + t * 150; // E note rising
      const freq3 = 392 + t * 100; // G note rising
      const envelope = Math.sin((Math.PI * t) / duration) * Math.exp(-t * 2);

      data[i] =
        envelope *
        (Math.sin(2 * Math.PI * freq1 * t) * 0.3 +
          Math.sin(2 * Math.PI * freq2 * t) * 0.2 +
          Math.sin(2 * Math.PI * freq3 * t) * 0.2) *
        0.3;
    }

    return buffer;
  }

  private initializeSounds() {
    if (!this.audioContext) return;

    const clickSound = this.createClickSound();
    const startupSound = this.createStartupSound();

    if (clickSound) this.sounds.set("click", clickSound);
    if (startupSound) this.sounds.set("startup", startupSound);
  }

  playSound(soundName: string) {
    if (!this.audioContext || this.audioContext.state === "suspended") {
      // Try to resume audio context
      this.audioContext?.resume();
      return;
    }

    if (this.sounds.size === 0) {
      this.initializeSounds();
    }

    const soundBuffer = this.sounds.get(soundName);
    if (!soundBuffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = soundBuffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  playClick() {
    this.playSound("click");
  }

  playStartup() {
    this.playSound("startup");
  }

  // Initialize audio context on user interaction
  initialize() {
    if (this.audioContext?.state === "suspended") {
      this.audioContext.resume();
    }
    this.initializeSounds();
  }
}

export const soundManager = new SoundManager();
