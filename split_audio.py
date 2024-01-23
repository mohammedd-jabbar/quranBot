import pydub
import requests


def split_audio(audio_url):
    # Download the audio in-memory
    response = requests.get(audio_url, stream=True)
    audio_data = b''
    for chunk in response.iter_content(chunk_size=1024):
        if chunk:  # Filter out keep-alive new chunks
            audio_data += chunk

    # Split the audio using pydub
    audio_file = pydub.AudioSegment.from_mp3(audio_data)
    total_duration = len(audio_file)
    segment_duration = total_duration // 4

    audio_chunks = []
    for i in range(4):
        start_time = i * segment_duration
        chunk = audio_file[start_time:start_time + segment_duration]
        chunk_data = chunk.raw_data  # Get the raw data for each chunk
        audio_chunks.append(chunk_data)

    return audio_chunks  # Return the raw audio data directly


split_audio()
