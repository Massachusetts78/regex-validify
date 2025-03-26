NODE = node
NPM = npm
YARN = yarn

# Detect package manager (default to npm)
ifneq ("$(wildcard yarn.lock)", "")
    PKG_MANAGER = $(YARN)
else
    PKG_MANAGER = $(NPM)
endif

# Install dependencies
install:
	@$(PKG_MANAGER) install

# Run docs
docs:
	@$(PKG_MANAGER) run docs

# Run tests
test:
	@$(PKG_MANAGER) run test
	
# Clean up the project (remove node_modules & build artifacts)
clean:
	@rm -rf node_modules dist docs
	@echo "Cleaned project dependencies and build files."

# Show available commands
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make test          - Run unit tests"
	@echo "  make docs          - Create documentation"
	@echo "  make clean         - Remove node_modules & dist"