<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InvoiceResource\Pages;
use App\Filament\Resources\InvoiceResource\RelationManagers;
use App\Models\Invoice;
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

use App\Models\Customer;
use Filament\Forms\Components\DatePicker;
use Carbon\Carbon;
use Illuminate\Support\Str;

class InvoiceResource extends Resource
{
  protected static ?string $model = Invoice::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  public static function form(Form $form): Form
  {
    $customers = Customer::pluck('name', 'id');

    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('customer_id')->hidden(),
          TextInput::make('no_invoice')
          ->label('No Invoice')
          ->default(fn () => mt_rand(1000000000, 9999999999))
          ->required()
          ->readOnly(),
          DatePicker::make('invoice_date')
            ->label('Invoice Date')
            ->displayFormat('d/m/Y')
            ->native(false)
            ->closeOnDateSelection(),

          Select::make('customer_id')->label('Customer')->options($customers)->required(),
          Repeater::make('invoice_item')
            ->schema([
              TextInput::make('description')->maxLength(255)->required()->columnStart([
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
              TextInput::make('price')->maxLength(255)->required()->prefix('Rp ')
              ->columnStart([
                'sm' => 3,
                'xl' => 3,
                '2xl' => 3,
              ])
              ->required()
              ->reactive(),
            ])
            ->label('Item')
            ->disableItemMovement(),
          Placeholder::make("total")
                                ->label("Total")
                                ->content(function ($get) {
                                    return collect($get('invoice_item'))
                                        ->pluck('price')
                                        ->sum();
                                }),

          Textarea::make('notes'),
        ])->reactive()
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('no_invoice')->label('No Invoice')->searchable(),
        TextColumn::make('invoice_date')->label('Invoice Date')->date(),
        TextColumn::make('customer.name')->label('Customer')->searchable(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        //
      ])
      ->actions([ViewAction::make(), EditAction::make(), DeleteAction::make()])
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
      'index' => Pages\ListInvoices::route('/'),
      'create' => Pages\CreateInvoice::route('/create'),
      'edit' => Pages\EditInvoice::route('/{record}/edit'),
    ];
  }
}
