terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "ur-aura" {
  name      = "ur-aura"
  framework = "create-react-app"
  git_repository = {
    type = "github"
    repo = "skinsshark/ur-aura"
  }
}

resource "vercel_project_domain" "ur-aura" {
  project_id = vercel_project.mbti.id
  domain     = "ur-aura.sharonzheng.com"
}
