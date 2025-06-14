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
    const duration = 0.15; // 150ms
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
      const frequency = 1200 * Math.exp(-t * 25);
      const amplitude = Math.exp(-t * 40);
      data[i] = amplitude * Math.sin(2 * Math.PI * frequency * t) * 0.2;
    }

    return buffer;
  }

  private createStartupSound(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 2.5; // 2.5 seconds
    const buffer = this.audioContext.createBuffer(
      2, // Stereo
      sampleRate * duration,
      sampleRate,
    );

    const leftChannel = buffer.getChannelData(0);
    const rightChannel = buffer.getChannelData(1);

    // Generate Windows XP startup sound-like sequence
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;

      // Create ascending chord progression
      const freq1 = 261.63; // C4
      const freq2 = 329.63; // E4
      const freq3 = 392.0; // G4
      const freq4 = 523.25; // C5

      // Time-based frequency modulation
      const modulation = 1 + 0.3 * Math.sin(2 * Math.PI * 0.5 * t);

      // Envelope for smooth attack and decay
      let envelope;
      if (t < 0.5) {
        envelope = t / 0.5; // Attack
      } else if (t < 2.0) {
        envelope = 1; // Sustain
      } else {
        envelope = (duration - t) / 0.5; // Decay
      }

      envelope = Math.max(0, Math.min(1, envelope));

      // Harmonic content
      const harmonic1 = Math.sin(2 * Math.PI * freq1 * modulation * t) * 0.4;
      const harmonic2 = Math.sin(2 * Math.PI * freq2 * modulation * t) * 0.3;
      const harmonic3 = Math.sin(2 * Math.PI * freq3 * modulation * t) * 0.2;
      const harmonic4 = Math.sin(2 * Math.PI * freq4 * modulation * t) * 0.1;

      const sample =
        envelope * (harmonic1 + harmonic2 + harmonic3 + harmonic4) * 0.15;

      leftChannel[i] = sample;
      rightChannel[i] = sample * 0.9; // Slight stereo separation
    }

    return buffer;
  }

  private createErrorSound(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.5; // 500ms
    const buffer = this.audioContext.createBuffer(
      1,
      sampleRate * duration,
      sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Generate Windows XP error sound
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency = 800 - t * 400; // Descending frequency
      const amplitude = Math.exp(-t * 3) * Math.sin((Math.PI * t) / duration);
      data[i] = amplitude * Math.sin(2 * Math.PI * frequency * t) * 0.3;
    }

    return buffer;
  }

  private createNotificationSound(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.8; // 800ms
    const buffer = this.audioContext.createBuffer(
      1,
      sampleRate * duration,
      sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Generate Windows XP notification sound (ding)
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;

      // Two-tone chime
      const freq1 = 880; // A5
      const freq2 = 1108; // C#6

      let envelope;
      if (t < 0.1) {
        envelope = t / 0.1;
      } else if (t < 0.4) {
        envelope = 1;
      } else {
        envelope = (duration - t) / 0.4;
      }

      envelope = Math.max(0, envelope);

      const tone1 = Math.sin(2 * Math.PI * freq1 * t) * 0.5;
      const tone2 = Math.sin(2 * Math.PI * freq2 * t) * 0.3;

      data[i] = envelope * (tone1 + tone2) * 0.2;
    }

    return buffer;
  }

  private initializeSounds() {
    if (!this.audioContext) return;

    const clickSound = this.createClickSound();
    const startupSound = this.createStartupSound();
    const errorSound = this.createErrorSound();
    const notificationSound = this.createNotificationSound();

    if (clickSound) this.sounds.set("click", clickSound);
    if (startupSound) this.sounds.set("startup", startupSound);
    if (errorSound) this.sounds.set("error", errorSound);
    if (notificationSound) this.sounds.set("notification", notificationSound);
  }

  playSound(soundName: string, volume: number = 1) {
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
    const gainNode = this.audioContext.createGain();

    source.buffer = soundBuffer;
    gainNode.gain.value = Math.max(0, Math.min(1, volume));

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    source.start();
  }

  playClick() {
    this.playSound("click", 0.6);
  }

  playStartup() {
    this.playSound("startup", 0.8);
  }

  playError() {
    this.playSound("error", 0.7);
  }

  playNotification() {
    this.playSound("notification", 0.5);
  }

  // Initialize audio context on user interaction
  initialize() {
    if (this.audioContext?.state === "suspended") {
      this.audioContext.resume();
    }
    this.initializeSounds();
  }

  // Set master volume
  setMasterVolume(volume: number) {
    if (this.audioContext) {
      // This would need to be implemented with a master gain node
      // for now we'll just store it for future use
      localStorage.setItem("xp_volume", volume.toString());
    }
  }

  getMasterVolume(): number {
    const stored = localStorage.getItem("xp_volume");
    return stored ? parseFloat(stored) : 1.0;
  }
}

export const soundManager = new SoundManager();
