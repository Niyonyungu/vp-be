# andasy.hcl app configuration file generated for vp-be on Saturday, 21-Mar-26 15:49:06 EET
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "vp-be"

app {

  env = {}

  port = 4000

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
