package rvc

import (
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

// Spec defines the RV-C parameter group numbers (PGNs) and messages
type Spec struct {
    PGNs map[string]PGNInfo `yaml:"pgns"`
}

// PGNInfo represents information about a PGN
type PGNInfo struct {
    Description string            `yaml:"description"`
    Fields      map[string]string `yaml:"fields"`
}

// LoadSpec loads the RV-C spec from a YAML file
func LoadSpec(path string) (*Spec, error) {
    data, err := ioutil.ReadFile(path)
    if err != nil {
        log.Fatalf("Error reading RV-C spec file: %v", err)
    }

    var spec Spec
    err = yaml.Unmarshal(data, &spec)
    if err != nil {
        log.Fatalf("Error parsing RV-C spec file: %v", err)
    }

    return &spec, nil
}
