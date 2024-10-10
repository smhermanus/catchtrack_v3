declare module 'africastalking' {
  interface SMSOptions {
    to: string[]
    message: string
    from?: string
    enqueue?: boolean
  }

  interface AfricasTalkingOptions {
    apiKey: string
    username: string
  }

  interface SMS {
    send(options: SMSOptions): Promise<any>
  }

  interface AfricasTalking {
    SMS: SMS

    // Add other services as needed
  }

  function AfricasTalking(options: AfricasTalkingOptions): AfricasTalking

  export = AfricasTalking
}
