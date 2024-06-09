.DEFAULT_GOAL := just
.PHONY: just first

SHELL = bash

BIN = /home/$(USER)/bin

# Install just (so you don't need to use Make.)

just:
	curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | \
	bash -s -- --to $(BIN)

