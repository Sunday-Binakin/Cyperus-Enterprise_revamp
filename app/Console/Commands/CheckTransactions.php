<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transactions:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = \App\Models\Transaction::count();
        $this->info("Total transactions: {$count}");
        
        $recent = \App\Models\Transaction::latest()->take(5)->get();
        foreach($recent as $transaction) {
            $this->line("- {$transaction->reference} | {$transaction->status} | {$transaction->amount} | {$transaction->created_at}");
        }
        
        return 0;
    }
}
