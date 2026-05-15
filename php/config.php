<?php
declare(strict_types=1);

// NewsPublic SDK configuration

class NewsPublicConfig
{
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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'image',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'link',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'site_icon',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'noticia',
          'op' => [
            'list' => [
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
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                        'active' => true,
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
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
