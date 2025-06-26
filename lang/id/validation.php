<?php

return [
  /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

  'accepted' => 'Kolom :attribute harus diterima.',
  'accepted_if' => 'Kolom :attribute harus diterima ketika :other bernilai :value.',
  'active_url' => 'Kolom :attribute harus berupa URL yang valid.',
  'after' => 'Kolom :attribute harus berupa tanggal setelah :date.',
  'after_or_equal' => 'Kolom :attribute harus berupa tanggal setelah atau sama dengan :date.',
  'alpha' => 'Kolom :attribute hanya boleh berisi huruf.',
  'alpha_dash' => 'Kolom :attribute hanya boleh berisi huruf, angka, strip, dan garis bawah.',
  'alpha_num' => 'Kolom :attribute hanya boleh berisi huruf dan angka.',
  'array' => 'Kolom :attribute harus berupa array.',
  'ascii' => 'Kolom :attribute hanya boleh berisi karakter alfanumerik ASCII satu byte.',
  'before' => 'Kolom :attribute harus berupa tanggal sebelum :date.',
  'before_or_equal' => 'Kolom :attribute harus berupa tanggal sebelum atau sama dengan :date.',
  'between' => [
    'array' => 'Kolom :attribute harus memiliki antara :min dan :max item.',
    'file' => 'Kolom :attribute harus antara :min dan :max kilobyte.',
    'numeric' => 'Kolom :attribute harus antara :min dan :max.',
    'string' => 'Kolom :attribute harus antara :min dan :max karakter.',
  ],
  'boolean' => 'Kolom :attribute harus bernilai benar atau salah.',
  'can' => 'Kolom :attribute berisi nilai yang tidak diizinkan.',
  'confirmed' => 'Konfirmasi :attribute tidak cocok.',
  'contains' => 'Kolom :attribute kehilangan nilai yang diperlukan.',
  'current_password' => 'Kata sandi salah.',
  'date' => 'Kolom :attribute harus berupa tanggal yang valid.',
  'date_equals' => 'Kolom :attribute harus berupa tanggal yang sama dengan :date.',
  'date_format' => 'Kolom :attribute harus sesuai format :format.',
  'decimal' => 'Kolom :attribute harus memiliki :decimal angka di belakang koma.',
  'declined' => 'Kolom :attribute harus ditolak.',
  'declined_if' => 'Kolom :attribute harus ditolak ketika :other adalah :value.',
  'different' => 'Kolom :attribute dan :other harus berbeda.',
  'digits' => 'Kolom :attribute harus :digits digit.',
  'digits_between' => 'Kolom :attribute harus antara :min dan :max digit.',
  'dimensions' => 'Dimensi gambar pada kolom :attribute tidak valid.',
  'distinct' => 'Kolom :attribute memiliki nilai duplikat.',
  'doesnt_end_with' =>
    'Kolom :attribute tidak boleh diakhiri dengan salah satu dari berikut: :values.',
  'doesnt_start_with' =>
    'Kolom :attribute tidak boleh diawali dengan salah satu dari berikut: :values.',
  'email' => 'Kolom :attribute harus berupa alamat email yang valid.',
  'ends_with' => 'Kolom :attribute harus diakhiri dengan salah satu dari berikut: :values.',
  'enum' => ':attribute yang dipilih tidak valid.',
  'exists' => ':attribute yang dipilih tidak valid.',
  'extensions' => 'Kolom :attribute harus memiliki ekstensi: :values.',
  'file' => 'Kolom :attribute harus berupa file.',
  'filled' => 'Kolom :attribute harus memiliki nilai.',
  'gt' => [
    'array' => 'Kolom :attribute harus memiliki lebih dari :value item.',
    'file' => 'Kolom :attribute harus lebih besar dari :value kilobyte.',
    'numeric' => 'Kolom :attribute harus lebih besar dari :value.',
    'string' => 'Kolom :attribute harus lebih dari :value karakter.',
  ],
  'gte' => [
    'array' => 'Kolom :attribute harus memiliki :value item atau lebih.',
    'file' => 'Kolom :attribute harus lebih besar atau sama dengan :value kilobyte.',
    'numeric' => 'Kolom :attribute harus lebih besar atau sama dengan :value.',
    'string' => 'Kolom :attribute harus lebih besar atau sama dengan :value karakter.',
  ],
  'hex_color' => 'Kolom :attribute harus berupa warna heksadesimal yang valid.',
  'image' => 'Kolom :attribute harus berupa gambar.',
  'in' => ':attribute yang dipilih tidak valid.',
  'in_array' => 'Kolom :attribute harus ada di dalam :other.',
  'integer' => 'Kolom :attribute harus berupa bilangan bulat.',
  'ip' => 'Kolom :attribute harus berupa alamat IP yang valid.',
  'ipv4' => 'Kolom :attribute harus berupa alamat IPv4 yang valid.',
  'ipv6' => 'Kolom :attribute harus berupa alamat IPv6 yang valid.',
  'json' => 'Kolom :attribute harus berupa string JSON yang valid.',
  'list' => 'Kolom :attribute harus berupa daftar.',
  'lowercase' => 'Kolom :attribute harus berupa huruf kecil.',
  'lt' => [
    'array' => 'Kolom :attribute harus memiliki kurang dari :value item.',
    'file' => 'Kolom :attribute harus kurang dari :value kilobyte.',
    'numeric' => 'Kolom :attribute harus kurang dari :value.',
    'string' => 'Kolom :attribute harus kurang dari :value karakter.',
  ],
  'lte' => [
    'array' => 'Kolom :attribute tidak boleh lebih dari :value item.',
    'file' => 'Kolom :attribute harus kurang dari atau sama dengan :value kilobyte.',
    'numeric' => 'Kolom :attribute harus kurang dari atau sama dengan :value.',
    'string' => 'Kolom :attribute harus kurang dari atau sama dengan :value karakter.',
  ],
  'mac_address' => 'Kolom :attribute harus berupa alamat MAC yang valid.',
  'max' => [
    'array' => 'Kolom :attribute tidak boleh lebih dari :max item.',
    'file' => 'Kolom :attribute tidak boleh lebih dari :max kilobyte.',
    'numeric' => 'Kolom :attribute tidak boleh lebih dari :max.',
    'string' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
  ],
  'max_digits' => 'Kolom :attribute tidak boleh memiliki lebih dari :max digit.',
  'mimes' => 'Kolom :attribute harus berupa file dengan tipe: :values.',
  'mimetypes' => 'Kolom :attribute harus berupa file dengan tipe: :values.',
  'min' => [
    'array' => 'Kolom :attribute harus memiliki minimal :min item.',
    'file' => 'Kolom :attribute minimal :min kilobyte.',
    'numeric' => 'Kolom :attribute minimal :min.',
    'string' => 'Kolom :attribute minimal :min karakter.',
  ],
  'min_digits' => 'Kolom :attribute minimal memiliki :min digit.',
  'missing' => 'Kolom :attribute harus kosong.',
  'missing_if' => 'Kolom :attribute harus kosong jika :other adalah :value.',
  'missing_unless' => 'Kolom :attribute harus kosong kecuali :other adalah :value.',
  'missing_with' => 'Kolom :attribute harus kosong jika :values ada.',
  'missing_with_all' => 'Kolom :attribute harus kosong jika :values ada.',
  'multiple_of' => 'Kolom :attribute harus kelipatan dari :value.',
  'not_in' => ':attribute yang dipilih tidak valid.',
  'not_regex' => 'Format kolom :attribute tidak valid.',
  'numeric' => 'Kolom :attribute harus berupa angka.',
  'password' => [
    'letters' => 'Kolom :attribute harus mengandung minimal satu huruf.',
    'mixed' => 'Kolom :attribute harus mengandung huruf besar dan kecil.',
    'numbers' => 'Kolom :attribute harus mengandung minimal satu angka.',
    'symbols' => 'Kolom :attribute harus mengandung minimal satu simbol.',
    'uncompromised' =>
      ':attribute yang diberikan telah bocor dalam data breach. Silakan pilih :attribute yang berbeda.',
  ],
  'present' => 'Kolom :attribute harus ada.',
  'prohibited' => 'Kolom :attribute tidak diperbolehkan.',
  'regex' => 'Format kolom :attribute tidak valid.',
  'required' => 'Kolom :attribute wajib diisi.',
  'unique' => ':attribute sudah digunakan.',
  'uploaded' => ':attribute gagal diunggah.',
  'url' => 'Kolom :attribute harus berupa URL yang valid.',
  'ulid' => 'The :attribute field must be a valid ULID.',
  'uuid' => 'The :attribute field must be a valid UUID.',

  /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

  'attributes' => [
    'name' => 'Nama',
    'username' => 'Username',
    'no_whatsapp' => 'Nomor WhatsApp',
  ],

  /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

  'attributes' => [],
];
