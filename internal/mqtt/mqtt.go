package mqtt

import (
	"log"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func ConnectAndSubscribe(broker string, topic string) {
    opts := mqtt.NewClientOptions().AddBroker(broker)
    client := mqtt.NewClient(opts)

    if token := client.Connect(); token.Wait() && token.Error() != nil {
        log.Fatalf("Error connecting to MQTT broker: %v", token.Error())
    }

    client.Subscribe(topic, 0, func(client mqtt.Client, msg mqtt.Message) {
        log.Printf("Received message on topic %s: %s", msg.Topic(), string(msg.Payload()))
        // Add handling logic for message payload
    })
}
