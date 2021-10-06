ifneq (,$(findstring src/,$(MAKECMDGOALS)))
	MAKECMDGOALS := $(subst src/,,$(MAKECMDGOALS))
endif

MAKEFLAGS += -s

up:
	docker-compose -f docker-compose.dev.yml up --build app

lint:
	docker-compose -f docker-compose.dev.yml exec app npx eslint . --ext .js,.jsx,.ts,.tsx

exec:
	docker-compose -f docker-compose.dev.yml exec app $(filter-out $@, $(MAKECMDGOALS))
