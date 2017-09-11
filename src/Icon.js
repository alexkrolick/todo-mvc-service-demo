import React from "react"

const Icon = ({ icon = "star", className = "", ...props }) => (
  <i {...props} className={`fa fa-${icon} ${className}`} aria-hidden="true" />
)

export default Icon
