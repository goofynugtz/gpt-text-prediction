import torch
import torch.nn.functional as F
from transformers import GPT2Tokenizer, GPT2LMHeadModel

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

model.eval()

def predict_next_word(text, num_words=1, temperature=1.0):
    input_ids = torch.tensor(tokenizer.encode(text)).unsqueeze(0)
    for _ in range(num_words):
        with torch.no_grad():
            outputs = model(input_ids)
            logits = outputs[0][:, -1, :] / temperature
            softmax_logits = F.softmax(logits, dim=-1)
            next_word_id = torch.multinomial(softmax_logits, num_samples=1)
        input_ids = torch.cat([input_ids, next_word_id], dim=-1)

    output_text = tokenizer.decode(input_ids.squeeze(), skip_special_tokens=True)
    return output_text
