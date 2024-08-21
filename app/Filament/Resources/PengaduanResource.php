<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PengaduanResource\Pages;
use App\Filament\Resources\PengaduanResource\RelationManagers;
use App\Models\Pengaduan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\{TextInput, Textarea, Select, Card};
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use App\Models\Kontrakan;
use Filament\Tables\Filters\TextFilter;
use Filament\Forms\Components\Section;

class PengaduanResource extends Resource
{
  protected static ?string $model = Pengaduan::class;
  protected static ?string $navigationIcon = 'heroicon-o-megaphone';
  protected static ?int $navigationSort = 2;
  // protected static ?string $navigationLabel = 'Data Pengaduan';
  // protected static ?string $label = 'Data Pengaduan';
  protected static ?string $slug = 'data-pengaduan';

  public static function form(Form $form): Form
  {
    // Fetch the available kontrakans from the database
    $kontrakans = Kontrakan::all()->pluck('nama', 'id')->toArray();

    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('nama')->required()->maxLength(255)->disabled(),

          TextInput::make('no_telp')
            ->required()
            ->label('No Whatsapp')
            ->minLength(10)
            ->maxLength(20)
            ->rules(['regex:/^(\+?\d{1,4}[\s-])?(?!0+$)\d{10,14}$/'])
            ->disabled(),

          Select::make('id_kontrakan')
            ->label('Nama Kontrakan')
            ->options($kontrakans) // Populate options with kontrakans data
            ->required()
            ->disabled(),

          Textarea::make('catatan')->required()->maxLength(65535)->disabled(),

          Select::make('status')
            ->options([
              'terbuka' => 'Terbuka',
              'sedang dalam proses' => 'Sedang Dalam Proses',
              'tertutup' => 'Tertutup',
            ])
            ->required()
            ->disabled(fn($livewire) => $livewire instanceof Pages\ViewPengaduan),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('combined_column')
          ->label('Nama & No Whatsapp')
          ->getStateUsing(function ($record) {
            $capitalizedNama = ucwords($record->nama);
            return $capitalizedNama . ' <br/>' . $record->no_telp;
          })
          ->html()
          ->searchable(),
        // ->searchable(),
        TextColumn::make('kontrakan.nama')
          ->label('Nama Kontrakan')
          ->limit(15)
          ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        // TextColumn::make('catatan')->limit(50),
        TextColumn::make('status')
          ->badge()
          ->color(
            fn(string $state): string => match ($state) {
              'terbuka' => 'info',
              'sedang dalam proses' => 'warning',
              'tertutup' => 'success',
            }
          )
          ->formatStateUsing(function ($state) {
            $capitalizedState = ucfirst($state); // Capitalizes the first letter
            return "<span class=\"capitalize\">$capitalizedState</span>";
          })
          ->html(),

        TextColumn::make('created_at')
          ->label('Tanggal')
          ->formatStateUsing(function ($state) {
            return \Carbon\Carbon::parse($state)->locale('id')->translatedFormat('d F Y H:i');
          })
          ->sortable(),
      ])
      ->filters([
        // SelectFilter::make('status')
        //   ->label('Status')
        //   ->options([
        //     'terbuka' => 'Terbuka',
        //     'sedang dalam proses' => 'Sedang Dalam Proses',
        //     'tertutup' => 'Tertutup',
        //   ]),
      ])
      ->actions([
        Tables\Actions\ViewAction::make()->iconButton(),
        Tables\Actions\EditAction::make()->iconButton(),
      ])
      ->bulkActions([
        // Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
        // Tables\Actions\BulkActionGroup::make([]),
      ])
      ->defaultSort('created_at', 'desc');
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListPengaduans::route('/'),
      // 'create' => Pages\CreatePengaduan::route('/create'),
      'edit' => Pages\EditPengaduan::route('/{record}/edit'),
      'view' => Pages\ViewPengaduan::route('/{record}/view'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Data Pengaduan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Pengelolaan');
  }
}
