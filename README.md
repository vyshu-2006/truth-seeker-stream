# Truth_Seeker

**Truth_Seeker** is an end-to-end system for automated claim verification and misinformation detection. It ingests textual claims or social media posts, retrieves supporting evidence from trusted sources, and classifies the claim as *True*, *False*, or *Unverified* using an ensemble of NLP models and heuristics.

## Demo
- Demo link (deployed frontend / demo): https://truth-seeker-stream.lovable.app
- Quick sample input: "Drinking carrot juice prevents COVID-19"
- Expected output: `Label: False` — `Confidence: 0.92` — `Evidence: [link-to-source]`
  
## Features
- Claim ingestion: single-sentence claim or short paragraphs
- Evidence retrieval: web scraping + news API + cached trusted sources
- NLP pipeline: text normalization → candidate retrieval → sentence-level verification → aggregation
- Model ensemble: fine-tuned transformer (BERT/DistilBERT) + TF‑IDF + logistic regression baseline
- Explainability: highlight sentences that support or contradict the claim with source URLs
- REST API for inference and batch processing

## Evaluation metrics 

Classification: Accuracy, Precision, Recall, F1-score (macro + per-class)

Calibration: Reliability diagrams or Expected Calibration Error (optional)

Evidence retrieval: Mean Average Precision  or Recall

## Screenshots 
<img width="796" height="770" alt="login" src="https://github.com/user-attachments/assets/b831d521-e1c7-4a56-a404-4461e886678d" />
<img width="1841" height="868" alt="dashboard" src="https://github.com/user-attachments/assets/fb54b937-adc1-4670-9a79-425eb90b5064" />
<img width="1129" height="810" alt="output" src="https://github.com/user-attachments/assets/5ef62305-07ec-43e3-a64b-a5a7f1461530" />



