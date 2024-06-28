<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuotationResource\Pages;
use App\Filament\Resources\QuotationResource\RelationManagers;
use App\Models\Quotation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\BelongsTo;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\Repeater;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\Action;

use App\Models\Customer;
use App\Models\Layanan;
use Filament\Forms\Components\DatePicker;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Infolists\Components\TextEntry;

class QuotationResource extends Resource
{
  protected static ?string $model = Quotation::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  public static function formatCurrencyIDR($amount)
  {
    return 'Rp ' . number_format($amount, 0, ',', '.');
  }

  public static function form(Form $form): Form
  {
    $customers = Customer::pluck('name', 'id');
    $descriptionOptions = Layanan::pluck('title')->toArray();

    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('customer_id')->hidden(),
          TextInput::make('no_quotation')
            ->label('No Quotation')
            ->default(fn() => mt_rand(1000000000, 9999999999))
            ->required()
            ->readOnly(),
          DatePicker::make('quotation_date')
            ->label('Quotation Date')
            ->displayFormat('d/m/Y')
            ->native(false)
            ->closeOnDateSelection()
            ->default(now()->format('Y-m-d'))
            ->required(),

          Select::make('customer_id')->label('Customer')->options($customers)->required(),
          Repeater::make('quotation_item')
            ->schema([
              TextInput::make('description')
                ->maxLength(255)
                ->required()
                ->datalist($descriptionOptions)
                ->columnStart([
                  'sm' => 1,
                  'xl' => 1,
                  '2xl' => 1,
                ]),
              TextInput::make('quantity')
                ->columnStart([
                  'sm' => 2,
                  'xl' => 2,
                  '2xl' => 2,
                ])
                ->numeric()
                ->default(1)
                ->minValue(1)
                ->required(),
              TextInput::make('price')
                ->maxLength(255)
                ->required()
                ->prefix('Rp ')
                ->columnStart([
                  'sm' => 3,
                  'xl' => 3,
                  '2xl' => 3,
                ])
                ->required()
                ->integer()
                ->reactive()
                ->live(),
            ])
            ->label('Item')
            ->disableItemMovement(),
          Placeholder::make('total')
            ->label('Total')
            ->content(function ($get) {
              $total = collect($get('quotation_item'))->sum(function ($item) {
                $cleanedPrice = (float) str_replace(
                  ['Rp ', '.', ','],
                  ['', '', '.'],
                  $item['price']
                );
                return $cleanedPrice;
              });
              return quotationResource::formatCurrencyIDR($total);
            }),

          Textarea::make('notes'),
        ])
        ->reactive()
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    $logo = asset('assets/images/logo.png');

    return $table
      ->columns([
        TextColumn::make('no_quotation')->label('No Quotation')->searchable(),
        TextColumn::make('quotation_date')->label('Quotation Date')->date(),
        TextColumn::make('customer.name')->label('Name')->searchable(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        //
      ])
      ->actions([
        Action::make('download')
          ->iconButton()
          ->icon('heroicon-o-arrow-down-tray')
          ->action(function (Quotation $record) {
            // Convert $record->quotation_item to a collection
            $quotationItems = collect($record->quotation_item);

            // Calculate sum of prices
            $sumPrice = $quotationItems->sum('price');

            // Load the view with data including sumPrice
            $pdf = PDF::loadView('quotations.pdf', ['record' => $record, 'sumPrice' => $sumPrice]);

            return response()->streamDownload(
              fn() => print $pdf->stream(),
              "quotation_{$record->no_quotation}.pdf"
            );
          }),
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          CreateAction::make()->createAnother(false),
        ]),
      ]);
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
      'index' => Pages\ListQuotations::route('/'),
      'create' => Pages\CreateQuotation::route('/create'),
      'edit' => Pages\EditQuotation::route('/{record}/edit'),
    ];
  }
}
