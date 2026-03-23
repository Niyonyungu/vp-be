# andasy.hcl app configuration file generated for vp-be on Monday, 23-Mar-26 11:27:49 EET
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "vp-be"

app {

  env = {}

  port = 3000

  primary_region = "kgl"

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "vp-be"
  }

}
