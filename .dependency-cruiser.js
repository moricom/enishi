/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "no-orphans",
            comment:
                "This is an orphan module - it's likely not used (anymore?). Either use it or " +
                "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
                "add an exception for it in your dependency-cruiser configuration. By default " +
                "this rule does not scrutinize dot-files (e.g. .eslintrc.js), TypeScript declaration " +
                "files (.d.ts), tsconfig.json and some of the babel and webpack configs.",
            severity: "warn",
            from: {
                orphan: true,
                pathNot: [
                    "(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$", // dot files
                    "\\.d\\.ts$", // TypeScript declaration files
                    "(^|/)tsconfig\\.json$", // TypeScript config
                    "(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$", // other configs
                    "(^|/)dist/*",
                    "(^|/)src/utils/*",
                    "(^|/)storybook-static/*",
                    "(^|/)jest.config.js",
                    "(^|/)coverage/*",
                    "(^|/)static/*"
                ]
            },
            to: {}
        },
        {
            name: "no-deprecated-core",
            comment:
                "A module depends on a node core module that has been deprecated. Find an alternative - these are " +
                "bound to exist - node doesn't deprecate lightly.",
            severity: "warn",
            from: {},
            to: {
                dependencyTypes: ["core"],
                path: [
                    "^(v8/tools/codemap)$",
                    "^(v8/tools/consarray)$",
                    "^(v8/tools/csvparser)$",
                    "^(v8/tools/logreader)$",
                    "^(v8/tools/profile_view)$",
                    "^(v8/tools/profile)$",
                    "^(v8/tools/SourceMap)$",
                    "^(v8/tools/splaytree)$",
                    "^(v8/tools/tickprocessor-driver)$",
                    "^(v8/tools/tickprocessor)$",
                    "^(node-inspect/lib/_inspect)$",
                    "^(node-inspect/lib/internal/inspect_client)$",
                    "^(node-inspect/lib/internal/inspect_repl)$",
                    "^(async_hooks)$",
                    "^(punycode)$",
                    "^(domain)$",
                    "^(constants)$",
                    "^(sys)$",
                    "^(_linklist)$",
                    "^(_stream_wrap)$"
                ]
            }
        },
        {
            name: "not-to-deprecated",
            comment:
                "This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later " +
                "version of that module, or find an alternative. Deprecated modules are a security risk.",
            severity: "warn",
            from: {},
            to: {
                dependencyTypes: ["deprecated"]
            }
        },
        {
            name: "not-to-unresolvable",
            comment:
                "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
                "module: add it to your package.json. In all other cases you likely already know what to do.",
            severity: "error",
            from: {
                pathNot: [
                    ".storybook/preview.js",
                    "src/gql/generated/graphql.ts",
                    "src/gql/generated/gql.ts",
                    "src/gql/generated/fragment-masking.ts"
                ]
            },
            to: {
                couldNotResolve: true
            }
        },
        {
            name: "no-duplicate-dep-types",
            comment:
                "Likely this module depends on an external ('npm') package that occurs more than once " +
                "in your package.json i.e. bot as a devDependencies and in dependencies. This will cause " +
                "maintenance problems later on.",
            severity: "warn",
            from: {},
            to: {
                moreThanOneDependencyType: true,
                dependencyTypesNot: ["type-only"]
            }
        },
        {
            name: "not-to-spec",
            comment:
                "This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. " +
                "If there's something in a spec that's of use to other modules, it doesn't have that single " +
                "responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.",
            severity: "error",
            from: {},
            to: {
                path: "\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$"
            }
        },
        {
            name: "not-to-dev-dep",
            severity: "error",
            comment:
                "This module depends on an npm package from the 'devDependencies' section of your " +
                "package.json. It looks like something that ships to production, though. To prevent problems " +
                "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
                "section of your package.json. If this module is development only - add it to the " +
                "from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration",
            from: {
                path: "^(src)",
                pathNot: "\\.(spec|test|stories)\\.(js|mjs|cjs|ts|tsx)$"
            },
            to: {
                dependencyTypes: ["npm-dev"]
            }
        },
        {
            name: "do-not-depends-from-enishi-ui",
            from: {
                path: "src/enishi-ui/.+",
                pathNot: "\\.(spec|test|stories)\\.(js|mjs|cjs|ts|tsx)$"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: ["(^|/)src/enishi-ui/.+", "(^|/)src/config/.+", "(^|/)src/utils/.+", "(^|/)src/types/utils.ts$"]
            }
        },
        {
            name: "do-not-depends-from-enishi-utils",
            from: {
                path: "(^|/)src/utils/.+",
                pathNot: "\\.(spec|test|stories)\\.(js|mjs|cjs|ts|tsx)$"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: ["(^|/)src/utils/.+"]
            }
        },
        {
            name: "do-not-depends-from-lib",
            from: {
                path: "(^|/)src/lib/.+"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: [
                    "(^|/)src/lib/.+",
                    "(^|/)src/utils/.+",
                    "(^|/)src/types/.+",
                    "(^|/)src/firebase.ts$",
                    "(^|/)src/config/.+",
                    "(^|/)src/gql/.+"
                ]
            }
        },
        {
            name: "do-not-depends-from-storage",
            from: {
                path: "(^|/)src/storage/.+"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: [
                    "(^|/)src/storage/.+",
                    "(^|/)src/utils/.+",
                    "(^|/)src/store/reactiveVar/.+",
                    "(^|/)src/types/.+",
                    "(^|/)src/config/.+"
                ]
            }
        },
        {
            name: "do-not-depends-from-reactiveVar",
            from: {
                path: "(^|/)src/views/store/reactiveVar/.+"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: ["(^|/)src/store/.+"]
            }
        },
        {
            name: "do-not-depends-from-components",
            from: {
                path: "(^|/)src/components/.+",
                pathNot: "(^|/)src/components/Editor/.+"
            },
            severity: "error",
            to: {
                path: "(^|/)src/.+",
                pathNot: [
                    "(^|/)src/types/.+",
                    "(^|/)src/components/.+",
                    "(^|/)src/hooks/.+",
                    "(^|/)src/enishi-ui/.+",
                    "(^|/)src/gql/.+",
                    "(^|/)src/utils/.+",
                    "(^|/)src/config/.+"
                ]
            }
        },
        {
            name: "feature-should-be-exported-from-the-`index.ts`",
            from: {
                path: "(^|/)src/features/([^/]+)/.+"
            },
            severity: "error",
            to: {
                path: "(^|/)src/features/([^/]+)/.+",
                pathNot: ["(^|/)src/features/$2/.+", "(^|/)src/features/([^/]+)/index.ts"]
            }
        }
    ],
    options: {
        doNotFollow: {
            path: "node_modules"
        },
        tsPreCompilationDeps: true,
        tsConfig: {
            fileName: "tsconfig.json"
        },
        enhancedResolveOptions: {
            exportsFields: ["exports"],
            conditionNames: ["import", "require", "node", "default"]
        },
        reporterOptions: {
            dot: {
                collapsePattern: "node_modules/[^/]+"
            },
            archi: {
                collapsePattern: "^(packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+|node_modules/[^/]+"
            },
            text: {
                highlightFocused: true
            }
        }
    }
};
