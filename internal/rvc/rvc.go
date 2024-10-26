package rvc

import (
	"github.com/brutella/can"
)

// Message represents an RV-C CAN message
type Message struct {
    PGN    uint32
    Source byte
    Data   []byte
}

// ParseMessage decodes a CAN message into an RV-C message
func ParseMessage(frame can.Frame) (*Message, error) {
    // Decode the frame based on RV-C protocol specs
    message := &Message{
        PGN:    (uint32(frame.Data[0]) << 16) | (uint32(frame.Data[1]) << 8) | uint32(frame.Data[2]),
        Source: frame.Data[3],
        Data:   frame.Data[4:],
    }
    return message, nil
}

// SendMessage sends an RV-C message to the CAN bus
func SendMessage(bus *can.Bus, message *Message) error {
	var data [8]uint8
	data[0] = message.Source
	copy(data[1:], message.Data)

	frame := can.Frame{
		ID:   uint32(message.PGN),
		Data: data,
	}
	return bus.Publish(frame)
}
