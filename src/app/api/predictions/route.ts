import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  const data = await req.formData()
  const input = data.get('prompt')

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.')
  }
  // swap this out with the model-specific api
  const model = 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc'

  let predictionResponse

  const output = await replicate.run(
    model,
    {
      input: {
        prompt: input,
        width: 768,
        height: 768,
        refine: 'expert_ensemble_refiner',
        apply_watermark: false,
        num_inference_steps: 25,
      },
    },
    (prediction) => {
      if (prediction.status === 'succeeded') {
        predictionResponse = prediction
      }
      console.log('Progress:', prediction)
    }
  )

  console.log({ output }, predictionResponse)
  return new Response(JSON.stringify(predictionResponse), { status: 201 })
}
