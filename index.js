#! /usr/bin/env node
'use strict'

const {join} = require('path')
const process = require('process')
const yaml = require('js-yaml')
const {getOwnPropertyDescriptor} = Object
const {exit, argv} = process
const {info, error} = global.console

const success = message => {
  info(message)
  exit(0)
}

const failure = (message, code = 1) => {
  error(message)
  exit(code)
}

const getprop = (object, property) => {
  if (object === undefined || object === null) return undefined
  const descriptor = getOwnPropertyDescriptor(object, property)
  if (!descriptor) return undefined
  return descriptor.value
}

const dump = x =>
  typeof x === 'object' && x ? yaml.dump(x) : String(x)

const [mdlname, ...field] = argv.slice(2)
mdlname || failure('Missing argument')

const pkgobject = require(join(mdlname, 'package.json'))
success(dump(field.reduce(getprop, pkgobject)))
