<?php
declare(strict_types=1);

// NewsPublic SDK configuration

class NewsPublicConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NewsPublic",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://news-public-api.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "noticia" => [],
                ],
            ],
            "entity" => [
        'noticia' => [
          'fields' => [
            [
              'name' => 'description',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'link',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'site_icon',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'noticia',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'all',
                        'orig' => 'all',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/noticias/',
                  'parts' => [
                    'api',
                    'noticias',
                  ],
                  'select' => [
                    'exist' => [
                      'all',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NewsPublicFeatures::make_feature($name);
    }
}
