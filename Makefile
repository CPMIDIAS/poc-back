ifneq (,$(findstring src/,$(MAKECMDGOALS)))
	MAKECMDGOALS := $(subst src/,,$(MAKECMDGOALS))
endif

MAKEFLAGS += -s

up:
	docker-compose up --build app

lint:
	docker-compose exec app npx eslint . --ext .js,.jsx,.ts,.tsx

exec:
	docker-compose exec app $(filter-out $@, $(MAKECMDGOALS))
